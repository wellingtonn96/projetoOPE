import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { CategoryProduct } from '../infra/mysql/entities/CategoryProduct';
import { ICategoryProductRepository } from '../repositories/ICategoryProductRepository';

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoryProductRepository')
    private categoryProductRepository: ICategoryProductRepository,
  ) {}

  public async execute(name: string): Promise<CategoryProduct> {
    const categoryExists = await this.categoryProductRepository.findByName(
      name,
    );

    if (categoryExists) {
      throw new AppError('category already exists');
    }

    const category = await this.categoryProductRepository.create(name);

    return category;
  }
}

export { CreateCategoryService };
