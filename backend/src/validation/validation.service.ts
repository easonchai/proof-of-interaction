import { Injectable } from '@nestjs/common';
import { createDecipheriv } from 'crypto';
import { aesCmac } from 'node-aes-cmac';
import { ValidationRequestDto } from './validation.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ValidationService {
  constructor(private readonly prismaService: PrismaService) {}

  private decrypt = (key: Buffer, data: Buffer) => {
    const decipher = createDecipheriv('aes-128-cbc', key, Buffer.alloc(16, 0));
    decipher.setAutoPadding(false);

    return Buffer.concat([decipher.update(data), decipher.final()]);
  };

  validateParams = (encryptedValue: string, cmacValue: string) => {
    if (!encryptedValue || !cmacValue)
      throw new Error('Invalid URL. Missing required params');

    // Decrypt PICCData
    const decryptedData = this.decrypt(
      Buffer.from('00000000000000000000000000000000', 'hex'),
      Buffer.from(encryptedValue, 'hex'),
    );

    const uid = decryptedData.subarray(1, 8);
    const readsBuf = decryptedData.subarray(8, 11);
    const reads = parseInt(readsBuf.reverse().toString('hex'), 16);

    // Validate CMAC
    const sv2 = `3CC300010080${uid.toString('hex')}${readsBuf
      .reverse()
      .toString('hex')}`;
    const KSesSDMFileReadMAC: Buffer = aesCmac(
      Buffer.from('00000000000000000000000000000000', 'hex'),
      Buffer.from(sv2, 'hex'),
      {
        returnAsBuffer: true,
      },
    );

    const zeroLengthInput = '';
    const unparsedCMAC = aesCmac(KSesSDMFileReadMAC, zeroLengthInput, {
      returnAsBuffer: true,
    });
    const CMAC = Buffer.alloc(unparsedCMAC.length / 2);
    let j = 0;
    for (let i = 0; i < unparsedCMAC.length; i++) {
      if (i % 2 !== 0) {
        CMAC[j] = unparsedCMAC[i];
        j += 1;
      }
    }

    // Only if CMAC is valid, then we can set the values to the class
    if (cmacValue.toLowerCase() === CMAC.toString('hex').toLowerCase()) {
      return {
        uid: uid.toString('hex').toUpperCase(),
        reads: reads,
        cmac: cmacValue,
      };
    } else {
      throw new Error("CMAC value doesn't match!");
    }
  };

  /**
   * Save the validation request to the database
   * @param data
   */
  saveHashedData = async (data: ValidationRequestDto, status: boolean) => {
    // Check if hashed data matches with the master API
    await this.prismaService.scan.create({
      data: {
        e: data.e,
        c: data.c,
        geolocation: data.geolocation,
        hash: data.encryptedData,
        tokenId: BigInt(data.encryptedData).toString(),
        valid: status,
      },
    });
  };

  validateHashedData = async (data: string) => {
    const scan = await this.prismaService.scan.findUnique({
      where: {
        hash: data,
      },
    });

    if (!scan) return false;
    return scan.valid;
  };
}
