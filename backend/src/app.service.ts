import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ethers } from 'ethers';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getTokenMetadata(tokenId: string) {
    let token;
    try {
      token = await this.prismaService.scan.findUnique({
        where: {
          hash: ethers.utils.hexZeroPad(
            `0x${BigInt(tokenId).toString(16)}`,
            32,
          ),
        },
      });
    } catch (err) {
      console.error(err);
    }

    const defaultTokenMetadata = {
      description:
        'A unique NFT representing a verifiable Proof of Interaction. Each token embodies a moment, a place, and an action that can never be replicated.',
      external_url: 'https://proofofinteraction.xyz/',
      image: 'https://proofofinteraction.xyz/nft/basic.png',
      name: `Proof of Interaction`,
      attributes: [
        {
          trait_type: 'Type',
          value: 'Basic',
        },
      ],
    };

    if (token) {
      if (token.geolocation) {
        return {
          ...defaultTokenMetadata,
          name: `✨ Proof of Interaction`,
          image: 'https://proofofinteraction.xyz/nft/special.png',
          attributes: [
            {
              trait_type: 'Type',
              value: '📍 Location-Based NFT 🔥',
            },
          ],
          geolocation: token.geolocation,
        };
      } else {
        return defaultTokenMetadata;
      }
    }

    return {};
  }
}
