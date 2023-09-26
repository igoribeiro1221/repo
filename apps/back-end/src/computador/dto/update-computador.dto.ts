import { PartialType } from '@nestjs/mapped-types';
import { CreateComputadorDto } from './create-computador.dto';

export class UpdateComputadorDto extends PartialType(CreateComputadorDto) {}
