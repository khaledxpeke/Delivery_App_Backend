import { expressConfig } from './config';
import { Application } from 'express';
import express = require('express');


export function createServer(): Application {
  const app: Application = expressConfig(express());
  return app;
}