# To generate new JWT Auth Keys

```
# Generate the RSA keys
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout > public.pem

# print the keys in an escaped format

# add this to env AUTH_JWT_PRIVATE_KEY
awk -v ORS='\\n' '1' private.pem

# add this to env AUTH_JWT_PUBLIC_KEY
awk -v ORS='\\n' '1' public.pem
```
