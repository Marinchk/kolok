Oleksii Shpuntov 44979 - frontend
Marina Olneva 48861 - 1 backend
Yelysei Uhrimov 45923 - 2 backend


Projekt jest aplikacją internetową do zarządzania listą zakupów z możliwością dodawania, usuwania, edytowania produktów, sortowania według ceny, liczenia kwoty zakupów w ciągu X dni i wysyłania listy na e-mail.

Funkcje projektu
CRUD produkt
Sortuj według Ceny (rosnąco / malejąco).
Zliczanie kwoty zakupów w ciągu X dni.
Wysyłanie listy zakupów na e-mail.

Backend: http://localhost:5000
Frontend: http://localhost:8080


Kontenery Docker
Projekt składa się z dwóch kontenerów:
Backend (Node.js, Express, Port 5000)
Frontend (html css port 8080) 



Wszystkie zależności są instalowane ręcznie przed zbudowaniem kontenera(brak node_modules w kontenerze).
 Rozpoczęcie projektu

 
Sklonuj repozytorium:

git clone  git@github.com:Marinchk/kolok.git
cd < NAZWA_PROJEKTU>
Zainstaluj zależności
docker-compose up --build


