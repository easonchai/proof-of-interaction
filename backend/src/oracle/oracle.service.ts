import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { ethers } from 'ethers';
import Oracle from 'src/contract/Oracle';
import ProofOfInteraction from 'src/contract/ProofOfInteraction';
import { ValidationService } from 'src/validation/validation.service';

@Injectable()
export class OracleService {
  constructor(private readonly validationService: ValidationService) {
    const provider = ethers.getDefaultProvider(
      `https://opt-goerli.g.alchemy.com/v2/${process.env.API_KEY}`,
    );

    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    this.oracleContract = new ethers.Contract(
      Oracle.address,
      Oracle.abi,
      this.wallet,
    );

    const filter = {
      address: ProofOfInteraction.address,
      topics: [ethers.utils.id('Interaction(address,bytes32)')],
    };

    provider.on(filter, this.handleInteractionEvent);

    provider.getBlockNumber().then(this.printBlockNumber);
  }

  logger: LoggerService = new Logger(OracleService.name);
  wallet: ethers.Wallet;
  oracleContract: ethers.Contract;

  printBlockNumber(blockNumber: number) {
    this.logger.log(`📦 Provider connected, block number: ${blockNumber}`);
  }

  async handleInteractionEvent(event: any) {
    const eventInterface = new ethers.utils.Interface(ProofOfInteraction.abi);

    const parsedEvent = eventInterface.parseLog(event);
    const hashedData = parsedEvent.args[1];

    console.log('📡 New event received:', parsedEvent.name);
    console.log('Interactor:', parsedEvent.args[0]);
    console.log('Hashed Data:', hashedData);

    console.log(
      'We can now take this hashed data and validate it with the master API.',
    );
    // Assume you make an API call to an external API to validate the data
    // For this instance, it would be locally, so I will just call a function
    const result = await this.validationService.validateHashedData(hashedData);
    await this.oracleContract.saveValidationRequest([
      `https://example-api.com/validate/${result}`,
      result,
    ]);
    console.log('✅ Request saved!');
  }
}
