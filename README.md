# cryptographic-libraries
A simple usage of a cryptographic protocol from Alice to Bob with Eve at the channel.

## Description
Using `node.js` as language to use a crytographic library that includes the standard implementation of basic algorithms, such as:

- AES
- DES
- 3DES
- HMAC
- SHA
- MD5

# crypto-js
*JavaScript library of crypto standards.*

## Cypher
- AES: It is FIPS. _crypto-js_ suports AES-128, AES-192, and AES-256. It receives the message and a secret passphrase. The latter is meant to be in plain text, but it can be generated via an assymetric key.
```javascript
var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase");
var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
```
- DES, 3DES: DES is considered now as insecure due to the small key size, that is when 3DES comes in.
```javascript
var encrypted = CryptoJS.DES.encrypt("Message", "Secret Passphrase");
var decrypted = CryptoJS.DES.decrypt(encrypted, "Secret Passphrase");

var encrypted = CryptoJS.TripleDES.encrypt("Message", "Secret Passphrase");
var decrypted = CryptoJS.TripleDES.decrypt(encrypted, "Secret Passphrase");
```

## Sign
- RSA: Only at [Node-RSA](https://www.npmjs.com/package/node-rsa), because _crypto-js_ doesn't includes it. This is based on JSBN library from [Tom Wu](http://www-cs-students.stanford.edu/~tjw/jsbn/)
```javascript
const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});
 
const text = 'Hello RSA!';
const encrypted = key.encrypt(text, 'base64');
console.log('encrypted: ', encrypted);
const decrypted = key.decrypt(encrypted, 'utf8');
console.log('decrypted: ', decrypted);
```
  - Parameters
    - keyData
    - format
    - options
  - It uses differents schemes:
    - Encryption: pkcs1_oaep (default) or pkcs1
    - Signing: pkcs1 or pkcs1-sha256 (default) or pss

## Hash
From the docs: "*The hash algorithms accept either strings or instances of CryptoJS.lib.WordArray. A WordArray object represents an array of 32-bit words. When you pass a string, it's automatically converted to a WordArray encoded as UTF-8.*".

Also, *the hash you get back isn't a string yet. It's a WordArray object. When you use a WordArray object in a string context, it's automatically converted to a hex string.*

- MD5: Basic use as integrity files checker. It is not collision resistant and not useful for SSL certificates.
```javascript
var hash = CryptoJS.MD5("Message");
```
- SHA-x: Developed by NSA. Mostly, it is collision resistant, but has been weaking as new attacks come by.
```javascript
var hash = CryptoJS.SHAx("Message");
```
- HMAC: For message authentication using cryptographic hash functions, eg. MD5 or SHA-x. It is a keyed-hash message authentication codes.
```javascript
var hash = CryptoJS.HmacMD5("Message", "Secret Passphrase");
var hash = CryptoJS.HmacSHA1("Message", "Secret Passphrase");
var hash = CryptoJS.HmacSHA256("Message", "Secret Passphrase");
var hash = CryptoJS.HmacSHA512("Message", "Secret Passphrase");
```

*Note*:
- The *x* in SHA-x means all the different versiones that this library works with, like 1, 256, 224, 512, 384, 3

# Reference
[crypto-js](https://www.npmjs.com/package/crypto-js)

[Node-RSA](https://www.npmjs.com/package/node-rsa)
