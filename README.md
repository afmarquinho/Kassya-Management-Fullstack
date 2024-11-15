# Kassya Management System
Kassya Management System es un ERP diseñado para la gestión eficiente de procesos de compra y el análisis detallado de procesos de ventas. Esta aplicación permite a las empresas optimizar sus operaciones, tomar decisiones basadas en datos y mejorar su flujo de trabajo.

Lenguaje principal: JavaScript
Entorno: Node.js
Frameworks: React y Next.js (versión 15)
Base de datos: PostgreSQL
ORM: Prisma
Framework de estilos: Tailwind CSS
Esta solución combina herramientas modernas para ofrecer una experiencia intuitiva y altamente personalizable en la administración de recursos empresariales.

## Pasos para levantar la aplicación en desarrollo
- 1. Clonar el repositorio:
``` bash
git clone https://github.com/afmarquinho/Kassya---Management---Fullstack.git
```
- 2. Copiar el archivo ```.env.temple``` y convertir en ".env".
- 3. Tener servicio de bases de datos activo.
- 4. Instalar dependencias:
``` bash
npm install
```
- 5. Hacer migranción de la base de datos:
```bash
npx prisma migrate dev
```
- 6. Hacer seed a la base de datos con el comando:
```bash
npm run seed
```
- 7. Correr el servidor en desarrollo:
```bash
npm run dev
```