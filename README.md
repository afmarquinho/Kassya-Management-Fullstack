# Kassya Management System
Kassya Management System es un ERP diseñado para la gestión eficiente de procesos de compra y el análisis detallado de procesos de ventas. Esta aplicación permite a las empresas optimizar sus operaciones, tomar decisiones basadas en datos y mejorar su flujo de trabajo.

El código combina herramientas modernas de desarollo para ofrecer una experiencia intuitiva y altamente personalizable.

### Stack
- Lenguaje principal: JavaScript
- Entorno: Node.js
- Frameworks: React y Next.js (versión 15)
- Base de datos: PostgreSQL
- ORM: Prisma
- Framework de estilos: Tailwind CSS

## Pasos para levantar la aplicación en desarrollo
- 1. Clonar el repositorio:
``` bash
git clone https://github.com/afmarquinho/Kassya-Management-Fullstack.git
```
- 2. Renombrar la carpeta clonada a ```kassya``` y desde consola:
```bash
cd kassya
```
- 3. Abrir el proyecto en el editor:
```bash
code .
```
- 4. Copiar el archivo ```.env.temple``` y renombrarlo a ".env".
- 5. Tener servicio de bases de datos activo.
- 6. Instalar dependencias:
``` bash
npm install
```
- 7. Hacer migranción de la base de datos:
```bash
npx prisma migrate dev
```
- 8. Generar el cliente Prisma:
```bash
npx prisma generate
```
- 9. Hacer seed a la base de datos con el comando:
```bash
npm run seed
```
- 10. Correr el servidor en desarrollo:
```bash
npm run dev
```