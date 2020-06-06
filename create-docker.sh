#!/bin/bash 
docker run --name gostack_postgres -e POSTGRES_PASSWORD=docker -p 5434:5432 -d postgres
