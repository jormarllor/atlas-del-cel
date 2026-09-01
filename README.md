# Atlas del Cel

Prototip web en Next.js pensat com un atles astronòmic narratiu i interactiu.

## Inclòs en aquesta versió

- Home editorial fosca i navegació bàsica.
- Capítol **Com llegir el cel**.
- Fitxa completa d'**Orió**.
- Bloc **Aquesta nit** amb data/hora, geolocalització opcional i càlcul d'altura/azimut prenent Alnilam com a referència.
- Mapa d'Orió projectat a partir de coordenades equatorials ICRS/J2000.
- Capa de línies, noms i figura mitològica.
- Imatge artística separada explícitament del mapa d'observació.
- Mitologia d'Orió desenvolupada amb variants del relat.
- Ruta de *star hopping* Orió → Sirius / Aldebaran / Plèiades amb posicions celestes reals.

## Executar localment

```bash
npm install
npm run dev
```

Obre `http://localhost:3000`.

## Desplegament

El projecte està preparat per connectar el repositori a Vercel com una aplicació Next.js.

## Rigor astronòmic

El mapa principal i la ruta utilitzen coordenades equatorials de catàleg. El bloc d'observació transforma ascensió recta/declinació en altura i azimut segons data, hora, latitud i longitud. La il·lustració mitològica és deliberadament artística i no es presenta com un mapa del cel.
