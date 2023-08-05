# API Documentation

This documentation provides an overview of the API endpoints.

## Product

### get one

**Endpoint**: GET /product/:name

Retrieves information about a specific product by its name.

#### Request Parameters

- name (string): The name of the product.

#### Response

- If the product is found:

```json
{
  "name": "Product Name",
  "sellers": [
    {
      "name": "Seller Name",
      "total": 123,
      "transactions": [
        {
          "type": "1",
          "date": "2023-08-05T12:34:56Z",
          "priceTag": 45,
          "typeReference": {
            "type": true,
            "description": true
          }
        },
        // More transactions...
      ]
    },
    // More sellers...
  ]
}
```

- If the product is not found:

```json
{
  "message": "Product not found",
  "ok": false
}
```

### get all

**Endpoint**: GET /products

Retrieves a list of all available products.

#### Response

- A list of product names:

```json
[
  "Product 1",
  "Product 2",
  // More products...
]
```

## Transaction

### create

**Endpoint**: POST /upload

Uploads and processes a file containing transaction data.

#### Request

- File: A transaction data file in the specified format.

#### Response

- Upon successful processing:

```json
{
  "successfulInserts": 10,
  "duplicated": 2
}
```

- If the file upload fails:

```json
{
  "message": "No file uploaded.",
  "ok": false
}
```

- If the file format is incorrect:

```json
{
  "message": "Please, make sure to be uploading a specific-file-type file type.",
  "ok": false
}
```

- If there are errors within the file:

```json
{
  "message": "Please, verify errors within your file.",
  "ok": false
}
```

- If insertion fails:

```json
{
  "message": "Couldn't proceed with your inserts.",
  "ok": false
}
```
