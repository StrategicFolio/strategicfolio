import { IsEnum, IsNotEmpty } from "class-validator";
import { IsEVMAddress } from "../../decorators";
import { PortfolioType } from "../../enums";

export class CreatePortfolioRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEVMAddress({ message: "Must be EVM-format address." })
  address: string;

  @IsNotEmpty()
  @IsEnum(PortfolioType)
  type: PortfolioType;
}
