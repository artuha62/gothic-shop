-- Включаем расширение pg_trgm для триграммного поиска
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Удаляем старые индексы если они есть
DROP INDEX IF EXISTS "Product_name_gin_idx";
DROP INDEX IF EXISTS "Product_description_gin_idx";
DROP INDEX IF EXISTS "Product_search_gin_idx";

-- Создаем GIN индексы для полнотекстового поиска
CREATE INDEX "Product_name_gin_idx" ON "Product" USING GIN (name gin_trgm_ops);
CREATE INDEX "Product_description_gin_idx" ON "Product" USING GIN (description gin_trgm_ops);

-- Составной индекс для поиска по обоим полям одновременно
CREATE INDEX "Product_search_gin_idx" ON "Product" USING GIN ((name || ' ' || COALESCE(description, '')) gin_trgm_ops);