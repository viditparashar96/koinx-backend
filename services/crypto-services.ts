import { CryptoRepository } from "../database/repository/crypto-repository";
import { APIError, STATUS_CODES } from "../utils/app-errors";

export class CryptoService {
  private repository: CryptoRepository;
  constructor() {
    this.repository = new CryptoRepository();
  }

  async getStats({ coin }: { coin: string }) {
    try {
      return await this.repository.getStats({ coin });
    } catch (error) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to fetch stats"
      );
    }
  }

  async getDeviation({ coin }: { coin: string }) {
    try {
      return await this.repository.getDeviation({ coin });
    } catch (error) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to fetch deviation"
      );
    }
  }
}
