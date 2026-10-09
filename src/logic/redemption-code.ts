const CODE_CHARACTERS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const CODE_LENGTH = 8;

export function getRedemptionCode(offerId: number): string {
  // In a prod environment we'd just call an API here which would
  // a) confirm the offer exists,
  // b) confirm the redemption hasn't been used,
  // c) do the code generation
  // but in this small slice we're just doing the code generation locally.
  // I would also not use Math.random in production - but we don't need full cryptographic security here

  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += CODE_CHARACTERS[Math.floor(Math.random() * CODE_CHARACTERS.length)];
  }

  return code;
}
