package prisma

import (
	"context"
	"log"
	"pc3r/prisma/db"
)

var (
	prisma *db.PrismaClient
	ctx    context.Context
)

func Init() error {
	prisma = db.NewClient()
	ctx = context.Background()
	
	// Connect to the database
	if err := prisma.Prisma.Connect(); err != nil {
		log.Printf("Failed to connect to database: %v", err)
		return err
	}
	
	return nil
}

func GetPrisma() (*db.PrismaClient, context.Context) {
	if prisma == nil {
		if err := Init(); err != nil {
			// Handle error appropriately - maybe panic or retry
			log.Fatal("Failed to initialize Prisma client")
		}
	}
	return prisma, ctx
}

// Add cleanup function
func Close() {
	if prisma != nil {
		if err := prisma.Prisma.Disconnect(); err != nil {
			log.Printf("Error disconnecting Prisma: %v", err)
		}
	}
}