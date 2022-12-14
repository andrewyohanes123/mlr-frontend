import ModelInstance from "forked.sirius.adapter/dist/libs/ModelInstance";
import { ICollectionResult } from "forked.sirius.adapter/dist/libs/Utility";

export interface ModelResult<T extends ModelInstance>
  extends ICollectionResult {
  rows: T[];
}

export interface UserAttributes extends ModelInstance {
  name: string;
  username: string;
  password: string;
  created_at?: Date;
  division_id?: number;
  type?: string;
  role_id?: number;
  updated_at?: Date;
  division?: DivisionAttributes;
  esign_id: number | null;
  disposition_recipients?: DispositionRecipientAttributes[];
  recipient_users?: RecipientUserAttributes[];
}

export type TFirstStep = {
  x1y: number;
  x2y: number;
  x3y: number;
  x4y: number;
  x1x2: number;
  x1x3: number;
  x1x4: number;
  x2x3: number;
  x2x4: number;
  x3x4: number;
  x12: number;
  x22: number;
  x32: number;
  x42: number;
};

export interface VariableAttributes extends ModelInstance {
  id: number;
  gender: string;
  occupation: string;
  age: number;
  x1: number;
  x2: number;
  x3: number;
  x4: number;
  first_step: TFirstStep;
  created_at?: Date;
  updated_at?: Date;
}

export interface ModelResult<T extends ModelInstance>
  extends ICollectionResult {
  rows: T[];
}

export type TMatrixH = number[];
export type TMatrixAn = number[][];

export interface CalculatedMatrix {
  matrixH: TMatrixH;
  matrixA: TMatrixAn;
  matrixA1: TMatrixAn;
  matrixA2: TMatrixAn;
  matrixA3: TMatrixAn;
  matrixA4: TMatrixAn;
  matrixA5: TMatrixAn;
  detA: number;
  detA1: number;
  detA2: number;
  detA3: number;
  detA4: number;
  detA5: number;
  b1: number;
  b2: number;
  b3: number;
  b4: number;
  b5: number;
}
