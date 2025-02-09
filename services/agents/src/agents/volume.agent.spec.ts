import { Test, TestingModule } from '@nestjs/testing';
import { VolumeAgent } from './volume.agent';
import { Bedrock } from '../utils/bedrock';
import { Logger } from '@nestjs/common';

describe('VolumeAgent', () => {
  let volumeAgent: VolumeAgent;
  let bedrockClient: Bedrock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VolumeAgent,
        {
          provide: Bedrock,
          useValue: {
            query: jest.fn(),
          },
        },
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
          },
        },
      ],
    }).compile();

    volumeAgent = module.get<VolumeAgent>(VolumeAgent);
    bedrockClient = module.get<Bedrock>(Bedrock);
  });

  it('should be defined', () => {
    expect(volumeAgent).toBeDefined();
  });

  it('should call bedrockClient.query with the correct query', async () => {
    const querySpy = jest
      .spyOn(bedrockClient, 'query')
      .mockResolvedValue('BTC');
    await volumeAgent.runAgent();
    expect(querySpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'Given the following volumes for tokens over the last 6 hours',
      ),
    );
  });

  it('should call contractSwap if response is not null', async () => {
    jest.spyOn(bedrockClient, 'query').mockResolvedValue('BTC');
    // eslint-disable-next-line
    const contractSwapSpy = jest.spyOn(volumeAgent as any, 'contractSwap');
    await volumeAgent.runAgent();
    expect(contractSwapSpy).toHaveBeenCalledWith('BTC');
  });
});
