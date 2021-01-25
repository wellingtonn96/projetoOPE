import { Router } from 'express';
import multer from 'multer';
import { connection } from '../database/dbConnection';
import { ProductRepository } from '../repositories/ProductRepository';
import { CreateProductService } from '../services/CreateProductsService';
import uploadConfig from '../config/upload';
import { FindProductService } from '../services/FindProductService';
import { UpdateProductService } from '../services/UpdateProductService';
import { DeleteProductService } from '../services/DeleteProductService';

const productsRoutes = Router();

const upload = multer(uploadConfig);

productsRoutes.get('/expirationDate', async (request, response) => {
  const productRepository = new ProductRepository(connection());

  const products = await productRepository.getExpirationDate();

  return response.json(products);
});

productsRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteProduct = new DeleteProductService();

  await deleteProduct.execute(id);

  return response.json().send();
});

productsRoutes.put('/:id', async (request, response) => {
  const { id } = request.params;
  const data = request.body;

  const updateProduct = new UpdateProductService();

  const product = await updateProduct.execute(id, data);

  return response.json(product);
});

productsRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;

  const findProduct = new FindProductService();

  const product = await findProduct.execute(id);

  return response.json(product);
});

productsRoutes.get('/', async (request, response) => {
  const productRepository = new ProductRepository(connection());

  const results = await productRepository.findAll();

  return response.json(results);
});

productsRoutes.post(
  '/',
  upload.single('produto_img'),
  async (request, response) => {
    const {
      idCategoria,
      codigo,
      marca,
      nome,
      descricao,
      validade,
      lote,
      statusProduto,
      valor,
      qtdeEstoque,
      idFornecedor,
    } = request.body;

    const createProducts = new CreateProductService();

    const product = await createProducts.execute({
      idCategoria,
      codigo,
      marca,
      nome,
      produto_img: request.file.filename,
      descricao,
      validade,
      lote,
      statusProduto,
      valor,
      qtdeEstoque,
      idFornecedor,
    });

    return response.json(product);
  },
);

export { productsRoutes };

// module.exports = (application)=>{

//     application.get('/produto/cadastrar',(req, res)=>{
//       if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//             application.app.controllers.produtos.cadastrar(application, req, res);
//           }else {
//             res.render("login/login", {validacao : {}});
//         }
//     });

//    application.post('/produto',(req, res)=>{
//      if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//         application.app.controllers.produtos.salvar(application, req, res);
//       }else {
//         res.render("login/login", {validacao : {}});
//     }
//     });

//   application.delete('/produto/excluir/:id',(req, res)=>{
//      if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//           application.app.controllers.produtos.excluir(application, req, res);
//         }else {
//           res.render("login/login", {validacao : {}});
//       }
//     });

//   application.update('/produto/editar/:id', (req, res)=>{
//      if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//           application.app.controllers.produtos.editar(application, req, res);
//         }else {
//           res.render("login/login", {validacao : {}});
//       }
//     });

//   application.post('/produto/salvar/:id', (req, res)=>{
//      if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//           application.app.controllers.produtos.atualizar(application, req, res);
//         }else {
//           res.render("login/login", {validacao : {}});
//       }
//     });

//   application.get('/produto/detalhes/:id', (req, res)=>{
//      if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//           application.app.controllers.produtos.detalhar(application, req, res);
//         }else {
//           res.render("login/login", {validacao : {}});
//       }
//     });

//   application.get('/produtos', (req, res)=>{
//      if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//           application.app.controllers.produtos.listar(application, req, res);
//         }else {
//           res.render("login/login", {validacao : {}});
//       }
//     });

//   application.get('/produto/categoria', (req, res)=>{
//     if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//           application.app.controllers.produtos.categoriaForm(application, req, res);
//         }else {
//           res.render("login/login", {validacao : {}});
//       }
//     });

//   application.post('/produto/categoria', (req, res)=>{
//     if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//           application.app.controllers.produtos.categoriaSalvar(application, req, res);
//         }else {
//           res.render("login/login", {validacao : {}});
//       }
//     });

//     application.get('/estoque', (req, res)=>{
//       if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//             application.app.controllers.produtos.estoqueProdutos(application, req, res);
//           }else {
//             res.render("login/login", {validacao : {}});
//         }
//       });

//       application.post('/estoque/:id', (req, res)=>{
//         if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//               application.app.controllers.produtos.atualizarEstoque(application, req, res);
//             }else {
//               res.render("login/login", {validacao : {}});
//           }
//         });
// }