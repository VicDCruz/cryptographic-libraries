import CryptoJS from "crypto-js";
import NodeRSA from "node-rsa";

const passphrase = "DWt7imoqPWtk5mHP3CXqpR0LdLpHp7GCmRG6VGVc";
const privateKey = '-----BEGIN RSA PRIVATE KEY-----\n' +
'MIIBOQIBAAJAVY6quuzCwyOWzymJ7C4zXjeV/232wt2ZgJZ1kHzjI73wnhQ3WQcL\n' +
'DFCSoi2lPUW8/zspk0qWvPdtp6Jg5Lu7hwIDAQABAkBEws9mQahZ6r1mq2zEm3D/\n' +
'VM9BpV//xtd6p/G+eRCYBT2qshGx42ucdgZCYJptFoW+HEx/jtzWe74yK6jGIkWJ\n' +
'AiEAoNAMsPqwWwTyjDZCo9iKvfIQvd3MWnmtFmjiHoPtjx0CIQCIMypAEEkZuQUi\n' +
'pMoreJrOlLJWdc0bfhzNAJjxsTv/8wIgQG0ZqI3GubBxu9rBOAM5EoA4VNjXVigJ\n' +
'QEEk1jTkp8ECIQCHhsoq90mWM/p9L5cQzLDWkTYoPI49Ji+Iemi2T5MRqwIgQl07\n' +
'Es+KCn25OKXR/FJ5fu6A6A+MptABL3r8SEjlpLc=\n' +
'-----END RSA PRIVATE KEY-----';

export function cypher(type, value) {
  switch (type) {
    case 'AES':
      return CryptoJS.AES.encrypt(value, passphrase).toString();
    case '3DES':
      return CryptoJS.TripleDES.encrypt(value, passphrase).toString();
    default:
      break;
  }
}

export function decypher(type, value) {
  switch (type) {
    case 'AES':
      return CryptoJS.AES.decrypt(value, passphrase).toString(CryptoJS.enc.Utf8);
    case '3DES':
      return CryptoJS.TripleDES.decrypt(value, passphrase).toString(CryptoJS.enc.Utf8);
    default:
      break;
  }
}

export function sign(value) {
  const key = new NodeRSA(privateKey);
  return key.sign(value);
}

export function verify(value, hash) {
  const key = new NodeRSA(privateKey);
  return key.verify(value, hash);
}

export function hash(type, value) {
  switch (type) {
    case 'MD5':
      return CryptoJS.MD5(value).toString();
    case 'SHA-512':
      return CryptoJS.SHA512(value).toString();
    case 'HMAC/SHA-512':
      return CryptoJS.HmacSHA512(value, passphrase).toString();
    default:
      break;
  }
}
