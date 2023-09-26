/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(5);
const computador_entity_1 = __webpack_require__(6);
const periferico_entity_1 = __webpack_require__(8);
const computador_module_1 = __webpack_require__(9);
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            computador_module_1.ComputadorModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: '246810',
                database: 'postgres',
                entities: [computador_entity_1.ComputadorEntity, periferico_entity_1.PerifericoEntity],
                synchronize: true,
                logging: true,
            }),
        ],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComputadorEntity = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(7);
const periferico_entity_1 = __webpack_require__(8);
let ComputadorEntity = exports.ComputadorEntity = class ComputadorEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.Column)({ primary: true }),
    tslib_1.__metadata("design:type", String)
], ComputadorEntity.prototype, "nome", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'cor' }),
    tslib_1.__metadata("design:type", String)
], ComputadorEntity.prototype, "cor", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'dataFabricacao' }),
    tslib_1.__metadata("design:type", Number)
], ComputadorEntity.prototype, "dataFabricacao", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => periferico_entity_1.PerifericoEntity, (photo) => photo.computador),
    tslib_1.__metadata("design:type", Array)
], ComputadorEntity.prototype, "perifericos", void 0);
exports.ComputadorEntity = ComputadorEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'computador' })
], ComputadorEntity);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PerifericoEntity = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(7);
const computador_entity_1 = __webpack_require__(6);
let PerifericoEntity = exports.PerifericoEntity = class PerifericoEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.Column)({ primary: true }),
    tslib_1.__metadata("design:type", String)
], PerifericoEntity.prototype, "nome", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => computador_entity_1.ComputadorEntity, (computador) => computador.perifericos),
    tslib_1.__metadata("design:type", typeof (_a = typeof computador_entity_1.ComputadorEntity !== "undefined" && computador_entity_1.ComputadorEntity) === "function" ? _a : Object)
], PerifericoEntity.prototype, "computador", void 0);
exports.PerifericoEntity = PerifericoEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'periferico' })
], PerifericoEntity);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComputadorModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const computador_service_1 = __webpack_require__(10);
const computador_controller_1 = __webpack_require__(11);
const typeorm_1 = __webpack_require__(5);
const computador_entity_1 = __webpack_require__(6);
const periferico_entity_1 = __webpack_require__(8);
let ComputadorModule = exports.ComputadorModule = class ComputadorModule {
};
exports.ComputadorModule = ComputadorModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([computador_entity_1.ComputadorEntity, periferico_entity_1.PerifericoEntity])],
        controllers: [computador_controller_1.ComputadorController],
        providers: [computador_service_1.ComputadorService],
    })
], ComputadorModule);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComputadorService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(7);
const computador_entity_1 = __webpack_require__(6);
const periferico_entity_1 = __webpack_require__(8);
let ComputadorService = exports.ComputadorService = class ComputadorService {
    constructor(computadorRepository, perifericoRepository) {
        this.computadorRepository = computadorRepository;
        this.perifericoRepository = perifericoRepository;
    }
    async create(createComputadorDto) {
        const computador = await this.computadorRepository.create(createComputadorDto);
        await this.computadorRepository.save(computador);
    }
    async findAll() {
        return await this.computadorRepository.find({ relations: ['perifericos'] });
    }
    async findOne(nome) {
        const foundComputador = await this.computadorRepository
            .createQueryBuilder('computador')
            .where('computador.nome = :nome', { nome })
            .leftJoinAndSelect('computador.perifericos', 'periferico')
            .getOne();
        return foundComputador;
    }
    async update(nome, updateComputadorDto) {
        const foundComputador = await this.findOne(nome);
        if (!foundComputador) {
            throw new Error('Computador não encontrado');
        }
        await this.computadorRepository.update(nome, updateComputadorDto);
    }
    async remove(nome) {
        const foundComputador = await this.findOne(nome);
        if (!foundComputador) {
            throw new Error('Computador não encontrado');
        }
        console.log(foundComputador);
        if (foundComputador.perifericos.length > 0) {
            foundComputador.perifericos.forEach(async (periferico) => {
                await this.perifericoRepository.delete(periferico.nome);
            });
        }
        await this.computadorRepository.delete(nome);
    }
    async addPeriferico(computadorNome, periferico) {
        const computador = await this.findOne(computadorNome);
        if (!computador) {
            throw new Error('Computador não encontrado');
        }
        const perifericoEntity = await this.perifericoRepository.create(periferico);
        await this.perifericoRepository.save(perifericoEntity);
        computador.perifericos.push(perifericoEntity);
        await this.computadorRepository.save(computador);
    }
    async removePeriferico(computadorNome, perifericoNome) {
        const computador = await this.findOne(computadorNome);
        if (!computador) {
            throw new Error('Computador não encontrado');
        }
        computador.perifericos = computador.perifericos.filter((periferico) => periferico.nome !== perifericoNome);
        await this.computadorRepository.save(computador);
        const periferico = await this.findPeriferico(perifericoNome);
        if (periferico) {
            await this.perifericoRepository.delete(periferico.nome);
        }
    }
    async findPeriferico(nome) {
        const foundPeriferico = await this.perifericoRepository
            .createQueryBuilder('periferico')
            .where('periferico.nome = :nome', { nome })
            .getOne();
        return foundPeriferico;
    }
};
exports.ComputadorService = ComputadorService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(computador_entity_1.ComputadorEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(periferico_entity_1.PerifericoEntity)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], ComputadorService);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComputadorController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const computador_service_1 = __webpack_require__(10);
const create_computador_dto_1 = __webpack_require__(12);
const update_computador_dto_1 = __webpack_require__(13);
const create_periferico_dto_1 = __webpack_require__(15);
let ComputadorController = exports.ComputadorController = class ComputadorController {
    constructor(computadorService) {
        this.computadorService = computadorService;
    }
    create(createComputadorDto) {
        return this.computadorService.create(createComputadorDto);
    }
    findAll() {
        return this.computadorService.findAll();
    }
    findOne(nome) {
        return this.computadorService.findOne(nome);
    }
    update(nome, updateComputadorDto) {
        return this.computadorService.update(nome, updateComputadorDto);
    }
    remove(nome) {
        return this.computadorService.remove(nome);
    }
    addPerifericoToComputador(computadorNome, periferico) {
        return this.computadorService.addPeriferico(computadorNome, periferico);
    }
    removePerifericoFromComputador(computadorNome, perifericoNome) {
        return this.computadorService.removePeriferico(computadorNome, perifericoNome);
    }
};
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof create_computador_dto_1.CreateComputadorDto !== "undefined" && create_computador_dto_1.CreateComputadorDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ComputadorController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ComputadorController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':nome'),
    tslib_1.__param(0, (0, common_1.Param)('nome')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ComputadorController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Put)(':nome'),
    tslib_1.__param(0, (0, common_1.Param)('nome')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_c = typeof update_computador_dto_1.UpdateComputadorDto !== "undefined" && update_computador_dto_1.UpdateComputadorDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ComputadorController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':nome'),
    tslib_1.__param(0, (0, common_1.Param)('nome')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ComputadorController.prototype, "remove", null);
tslib_1.__decorate([
    (0, common_1.Post)(':nome/perifericos'),
    tslib_1.__param(0, (0, common_1.Param)('nome')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_d = typeof create_periferico_dto_1.CreatePerifericoDto !== "undefined" && create_periferico_dto_1.CreatePerifericoDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ComputadorController.prototype, "addPerifericoToComputador", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':nome/perifericos/:perifericoNome'),
    tslib_1.__param(0, (0, common_1.Param)('nome')),
    tslib_1.__param(1, (0, common_1.Param)('perifericoNome')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], ComputadorController.prototype, "removePerifericoFromComputador", null);
exports.ComputadorController = ComputadorController = tslib_1.__decorate([
    (0, common_1.Controller)('computador'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof computador_service_1.ComputadorService !== "undefined" && computador_service_1.ComputadorService) === "function" ? _a : Object])
], ComputadorController);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateComputadorDto = void 0;
class CreateComputadorDto {
}
exports.CreateComputadorDto = CreateComputadorDto;


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateComputadorDto = void 0;
const mapped_types_1 = __webpack_require__(14);
const create_computador_dto_1 = __webpack_require__(12);
class UpdateComputadorDto extends (0, mapped_types_1.PartialType)(create_computador_dto_1.CreateComputadorDto) {
}
exports.UpdateComputadorDto = UpdateComputadorDto;


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePerifericoDto = void 0;
class CreatePerifericoDto {
}
exports.CreatePerifericoDto = CreatePerifericoDto;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map