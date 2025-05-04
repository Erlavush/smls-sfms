-- CreateTable
CREATE TABLE "Specialization" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_FacultySpecializations" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FacultySpecializations_A_fkey" FOREIGN KEY ("A") REFERENCES "Specialization" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FacultySpecializations_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Specialization_name_key" ON "Specialization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_FacultySpecializations_AB_unique" ON "_FacultySpecializations"("A", "B");

-- CreateIndex
CREATE INDEX "_FacultySpecializations_B_index" ON "_FacultySpecializations"("B");
