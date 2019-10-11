#!/bin/bash

echo "remove dist folder"

file="dist"
if [ -d "$file" ]
then
	rm -r "$file"
fi
