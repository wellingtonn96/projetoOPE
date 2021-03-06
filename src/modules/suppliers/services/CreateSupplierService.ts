import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Supplier } from '../infra/mysql/entities/Supplier';
import { ISupplierRepository } from '../repositories/ISupplierRepository';

interface IRequest {
  telefone: string;
  cnpj: string;
  email: string;
  endereco: string;
}

@injectable()
class CreateSupplierService {
  constructor(
    @inject('SupplierRepository')
    private supplierRepository: ISupplierRepository,
  ) {}

  public async execute({
    telefone,
    cnpj,
    email,
    endereco,
  }: IRequest): Promise<Supplier> {
    const results = await this.supplierRepository.findByEmail(email);

    if (results) {
      throw new AppError('Supplier already exists');
    }

    const supplier = await this.supplierRepository.create({
      telefone,
      cnpj,
      email,
      endereco,
    });

    return supplier;
  }
}

export { CreateSupplierService };
