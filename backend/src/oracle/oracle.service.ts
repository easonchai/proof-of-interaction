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

    provider.on(filter, (event) =>
      this.handleInteractionEvent(event, validationService),
    );
    provider.getBlockNumber().then(this.printBlockNumber);

    const mantleFilter = {
      address: '0x0A2134B97F973a2784B49e825E85EbD123a9fFD9',
      topics: [ethers.utils.id('Interaction(address,bytes32)')],
    };
    const mantleProvider = ethers.getDefaultProvider(
      'https://rpc.testnet.mantle.xyz',
    );
    mantleProvider.on(mantleFilter, (event) =>
      this.handleMantleInteractionEvent(event, validationService),
    );
    mantleProvider.getBlockNumber().then(this.printBlockNumber);
    this.mantleContract = new ethers.Contract(
      '0xa8eb4D756e773899599FbaE14151FfD7f7332cb4',
      Oracle.abi,
      new ethers.Wallet(process.env.PRIVATE_KEY, mantleProvider),
    );

    const taikoFilter = {
      address: '0xa1Ee1C974618d6459c3329B326074C82cDD3F952',
      topics: [ethers.utils.id('Interaction(address,bytes32)')],
    };
    const taikoProvider = ethers.getDefaultProvider(
      'https://rpc.jolnir.taiko.xyz',
    );
    taikoProvider.on(taikoFilter, (event) =>
      this.handleTaikoInteractionEvent(event, validationService),
    );
    taikoProvider.getBlockNumber().then(this.printBlockNumber);
    this.taikoContract = new ethers.Contract(
      '0x507DFC84cDAE4f69d1bef2F7376224f2767fE09b',
      Oracle.abi,
      new ethers.Wallet(process.env.PRIVATE_KEY, taikoProvider),
    );
  }

  wallet: ethers.Wallet;
  oracleContract: ethers.Contract;
  mantleContract: ethers.Contract;
  taikoContract: ethers.Contract;

  printBlockNumber(blockNumber: number) {
    console.log(`📦 Provider connected, block number: ${blockNumber}`);
  }

  async handleInteractionEvent(
    event: any,
    validationService: ValidationService,
  ) {
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
    const result = await validationService.validateHashedData(hashedData);
    await this.oracleContract.saveValidationRequest(
      `https://proofofinteraction.xyz/validation/${result}`,
      hashedData,
      result,
    );
    console.log('✅ Request saved!');
  }

  async handleMantleInteractionEvent(
    event: any,
    validationService: ValidationService,
  ) {
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
    const result = await validationService.validateHashedData(hashedData);
    await this.mantleContract.saveValidationRequest(
      `https://proofofinteraction.xyz/validation/${result}`,
      hashedData,
      result,
    );
    console.log('✅ Request saved!');
  }

  async handleTaikoInteractionEvent(
    event: any,
    validationService: ValidationService,
  ) {
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
    const result = await validationService.validateHashedData(hashedData);
    await this.mantleContract.saveValidationRequest(
      `https://proofofinteraction.xyz/validation/${result}`,
      hashedData,
      result,
    );
    console.log('✅ Request saved!');
  }
}
