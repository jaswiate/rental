# Endpointy API

<details>
  <summary>/products</summary>
  
#### Pobierz wszystkie produkty

- Metoda HTTP: GET
- Endpoint: `/`
- Dostępność: publiczne
- Zwraca:
  - Status: 200 OK
  - Content-Type: application/json
  - Body: Tablica obiektów produktów.

#### Dodaj nowy produkt

- Metoda HTTP: POST
- Endpoint: `/`
- Dostępność: wymagane zalogowanie i uprawnienia administratora
- Body:
  - Content-Type: application/json
  - Parametry:
    - `name` (string): Nazwa produktu.
    - `description` (string): Opis produktu.
    - `quantity` (number): Ilość produktu.
    - `imageUrl` (string): Adres URL obrazka produktu.
- Zwraca:
  - Status: 201 Created
  - Content-Type: application/json
  - Body: Obiekt utworzonego produktu.

#### Pobierz produkt o podanym Id

- Metoda HTTP: GET
- Endpoint: `/:id`
- Dostępność: publiczne
- Parametry:
  - `id` (string): Identyfikator produktu.
- Zwraca:
  - Status: 200 OK
  - Content-Type: application/json
  - Body: Obiekt produktu o określonym identyfikatorze.

#### Zaktualizuj produkt o podanym Id

- Metoda HTTP: PUT
- Endpoint: `/:id`
- Dostępność: wymagane zalogowanie i uprawnienia administratora
- Parametry:
  - `id` (string): Identyfikator produktu.
- Body:
  - Content-Type: application/json
  - Parametry:
    - `name` (string): Zaktualizowana nazwa produktu.
    - `description` (string): Zaktualizowany opis produktu.
    - `quantity` (number): Zaktualizowana ilość produktu.
    - `imageUrl` (string): Zaktualizowany adres URL obrazka produktu.
- Zwraca:
  - Status: 200 OK
  - Content-Type: application/json
  - Body: Zaktualizowany obiekt produktu.

#### Usuń produkt o podanym Id

- Metoda HTTP: DELETE
- Endpoint: `/:id`
- Dostępność: wymagane zalogowanie i uprawnienia administratora
- Parametry:
  - `id` (string): Identyfikator produktu.
- Zwraca:
  - Status: 200 OK
  - Content-Type: application/json
  - Body: Komunikat o pomyślnym usunięciu produktu.
</details>
<details>
  <summary>/rentals</summary>
  
#### Pobierz wszystkie wypożyczenia

- Metoda HTTP: GET
- Endpoint: `/`
- Dostępność: wymagane zalogowanie i uprawnienia administratora
- Zwraca:
  - Status: 200 OK
  - Content-Type: application/json
  - Body: Tablica obiektów wypożyczeń.

#### Pobierz wypożyczenie o podanym Id

- Metoda HTTP: GET
- Endpoint: `/:id`
- Dostępność: wymagane zalogowanie i uprawnienia administratora
- Parametry:
  - `id` (string): Identyfikator wypożyczenia.
- Zwraca:
  - Status: 200 OK
  - Content-Type: application/json
  - Body: Obiekt wypożyczenia o określonym identyfikatorze.

#### Dodaj nowe wypożyczenie

- Metoda HTTP: POST
- Endpoint: `/`
- Dostępność: wymagane zalogowanie
- Body:
  - Content-Type: application/json
  - Parametry (przykład):
    - `userId` (string): Identyfikator użytkownika.
    - `productId` (string): Identyfikator produktu.
    - `rentalDate` (string): Data wypożyczenia.
    - `returnDate` (string): Data zwrotu.
- Zwraca:
  - Status: 201 Created
  - Content-Type: application/json
  - Body: Obiekt utworzonego wypożyczenia.

#### Zaktualizuj wypożyczenie o podanym Id

- Metoda HTTP: PUT
- Endpoint: `/:id`
- Dostępność: wymagane zalogowanie i uprawnienia administratora
- Parametry:
  - `id` (string): Identyfikator wypożyczenia.
- Body:
  - Content-Type: application/json
  - Parametry (przykład):
    - `userId` (string): Zaktualizowany identyfikator użytkownika.
    - `productId` (string): Zaktualizowany identyfikator produktu.
    - `rentalDate` (string): Zaktualizowana data wypożyczenia.
    - `returnDate` (string): Zaktualizowana data zwrotu.
- Zwraca:
  - Status: 200 OK
  - Content-Type: application/json
  - Body: Zaktualizowany obiekt wypożyczenia.

#### Usuń wypożyczenie o podanym Id

- Metoda HTTP: DELETE
- Endpoint: `/:id`
- Dostępność: wymagane zalogowanie i uprawnienia administratora
- Parametry:
  - `id` (string): Identyfikator wypożyczenia.
- Zwraca:
  - Status: 200 OK
  - Content-Type: application/json
  - Body: Komunikat o pomyślnym usunięciu wypożyczenia.

#### Oblicz opłaty za przetrzymanie

- Metoda HTTP: GET
- Endpoint: `/fines`
- Dostępność: wymagane zalogowanie i uprawnienia administratora
- Zwraca:
  - Status: 200 OK
  - Content-Type: application/json
  - Body: Tablica obiekt
</details>
<details>
  <summary>/user</summary>
  
#### Rejestracja użytkownika

- Metoda HTTP: POST
- Endpoint: `/signup`
- Dostępność: publiczne
- Middleware: `checkDuplicateUsername` (sprawdza, czy nazwa użytkownika jest unikalna)
- Body:
  - Content-Type: application/json
  - Parametry:
    - `username` (string): Nazwa użytkownika.
    - `password` (string): Hasło użytkownika.
- Zwraca:
  - Status: 200 OK
  - Content-Type: application/json
  - Body: Obiekt zarejestrowanego użytkownika.

#### Logowanie użytkownika

- Metoda HTTP: POST
- Endpoint: `/signin`
- Dostępność: publiczne
- Body:
  - Content-Type: application/json
  - Parametry:
    - `username` (string): Nazwa użytkownika.
    - `password` (string): Hasło użytkownika.
- Zwraca:
  - Status: 200 OK
  - Content-Type: application/json
  - Body: Obiekt zalogowanego użytkownika.

#### Pobierz wypożyczenia użytkownika

- Metoda HTTP: GET
- Endpoint: `/rentals`
- Dostępność: wymagane zalogowanie
- Middleware: `verifyToken` (sprawdza ważność tokenu uwierzytelniającego)
- Zwraca:
  - Status: 200 OK
  - Content-Type: application/json
  - Body: Tablica obiektów wypożyczeń użytkownika.
</details>
