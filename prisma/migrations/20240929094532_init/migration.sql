-- CreateTable
CREATE TABLE "denominaciones" (
    "id" BIGSERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "descripcion" TEXT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "denominaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productos" (
    "id" BIGSERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "bodega" VARCHAR(255),
    "descripcion" TEXT NOT NULL,
    "maridaje" TEXT NOT NULL,
    "precio" DECIMAL(10,2) NOT NULL,
    "graduacion" DECIMAL(5,2) NOT NULL,
    "ano" INTEGER,
    "sabor" VARCHAR(255),
    "tipo_id" BIGINT NOT NULL,
    "imagen" VARCHAR(255) NOT NULL,
    "denominacion_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "destacado" TEXT NOT NULL DEFAULT 'N',
    "oferta" TEXT NOT NULL DEFAULT 'N',
    "stock" INTEGER NOT NULL DEFAULT 200,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipos" (
    "id" BIGSERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "descripcion" TEXT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "tipos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "userId" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "email_verified_at" TIMESTAMP(0),
    "password" VARCHAR(255) NOT NULL,
    "remember_token" VARCHAR(100),
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordenes" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "userId" TEXT NOT NULL,
    "subtotal" DECIMAL(8,2) NOT NULL,
    "total" DECIMAL(8,2) NOT NULL,
    "iva" DECIMAL(8,2) NOT NULL,
    "pagado" VARCHAR(1) NOT NULL,
    "entregado" VARCHAR(1) NOT NULL,
    "transactionId" VARCHAR(255),
    "articulos" INTEGER NOT NULL,

    CONSTRAINT "ordenes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provincia" (
    "id" BIGSERIAL NOT NULL,
    "codigo" VARCHAR(2) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,

    CONSTRAINT "provincia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poblacion" (
    "id" BIGSERIAL NOT NULL,
    "codigo" VARCHAR(5) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,

    CONSTRAINT "poblacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalles" (
    "id" BIGSERIAL NOT NULL,
    "orden_id" BIGINT NOT NULL,
    "product_id" BIGINT NOT NULL,
    "precio" DECIMAL(8,2) NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "imagen" VARCHAR(255),
    "nombre" VARCHAR(255),

    CONSTRAINT "detalles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "direcciones" (
    "id" BIGSERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellidos" VARCHAR(150) NOT NULL,
    "calle" VARCHAR(150) NOT NULL,
    "numero" VARCHAR(5) NOT NULL,
    "escalera" VARCHAR(5),
    "piso" VARCHAR(20),
    "puerta" VARCHAR(5),
    "poblacion" VARCHAR(5) NOT NULL,
    "provincia" VARCHAR(2) NOT NULL,
    "user_id" BIGINT NOT NULL,
    "telefono" VARCHAR(15) NOT NULL,

    CONSTRAINT "direcciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orden_direcciones" (
    "id" BIGSERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellidos" VARCHAR(150) NOT NULL,
    "calle" VARCHAR(150) NOT NULL,
    "numero" VARCHAR(5) NOT NULL,
    "escalera" VARCHAR(5),
    "piso" VARCHAR(20),
    "puerta" VARCHAR(5),
    "poblacion" VARCHAR(5) NOT NULL,
    "provincia" VARCHAR(2) NOT NULL,
    "user_id" BIGINT NOT NULL,
    "userId" TEXT NOT NULL,
    "orden_id" BIGINT NOT NULL,
    "telefono" VARCHAR(15) NOT NULL,

    CONSTRAINT "orden_direcciones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "denominaciones_nombre_key" ON "denominaciones"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "productos_nombre_key" ON "productos"("nombre");

-- CreateIndex
CREATE INDEX "productos_denominacion_id_idx" ON "productos"("denominacion_id");

-- CreateIndex
CREATE INDEX "productos_tipo_id_idx" ON "productos"("tipo_id");

-- CreateIndex
CREATE UNIQUE INDEX "tipos_nombre_key" ON "tipos"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "users_userId_key" ON "users"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "provincia_nombre_key" ON "provincia"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "poblacion_nombre_key" ON "poblacion"("nombre");

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_denominacion_id_fkey" FOREIGN KEY ("denominacion_id") REFERENCES "denominaciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_tipo_id_fkey" FOREIGN KEY ("tipo_id") REFERENCES "tipos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ordenes" ADD CONSTRAINT "ordenes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalles" ADD CONSTRAINT "detalles_orden_id_fkey" FOREIGN KEY ("orden_id") REFERENCES "ordenes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
