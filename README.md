# Alanas CV QA Homework

This repository contains automated test scripts to validate the total price after applying a voucher on the carVertical website.

## Test Case

1. Visit [carVertical](https://www.carvertical.com).
2. In the VIN form, submit `SALLAAA146A396339` VIN.
3. Once the precheck has loaded, pick the 3-report package.
4. On the checkout page, apply `qahomework` voucher.
5. Validate that the total price is shown correctly.

## Running the Test

To run the test, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Ryd3r1s/Alanas-QA-cV
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd Alanas-QA-cV
   ```

3. **Install Dependencies**

   ```bash
   yarn install
   ```

4. **Run the Test**

   ```bash
   yarn test
   ```
