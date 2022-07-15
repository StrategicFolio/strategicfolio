import { registerDecorator, ValidationOptions } from "class-validator";
import { utils } from "ethers";

export const IsEVMAddress = (options?: ValidationOptions) => {
  return (object: Object, propertyName: string) =>
    registerDecorator({
      name: "IsEVMAddress",
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate(value) {
          try {
            const checksumAddress = utils.getAddress(value);
            return utils.isAddress(checksumAddress);
          } catch {
            return false;
          }
        },
      },
    });
};
