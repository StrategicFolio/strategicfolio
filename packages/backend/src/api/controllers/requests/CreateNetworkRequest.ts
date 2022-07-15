import { IsNotEmpty } from "class-validator";

export class CreateNetworkRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  rpc: string;
}
