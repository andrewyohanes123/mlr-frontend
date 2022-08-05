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

export interface ModelResult<T extends ModelInstance>
  extends ICollectionResult {
  rows: T[];
}