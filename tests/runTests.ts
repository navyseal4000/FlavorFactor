/// <reference types="node" />

import { strict as assert } from 'node:assert';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

import './setupTesting';

import { designManifest } from '@modules/design/manifest';

import { runProfileScreenTests } from './profileScreens.test';
import { runPlanFeatureTests } from './planFeature.test';

const root = join(__dirname, '..');

function routeToScreenPath(route: string) {
  const cleaned = route.replace(/^\/+/, '');
  const segments = cleaned.split('/').filter(Boolean);
  if (segments.length === 0) {
    throw new Error(`Invalid route '${route}' in design manifest.`);
  }

  const directory = join(root, 'app', ...segments.slice(0, -1));
  const filename = segments.length === 1 ? 'index.tsx' : `${segments[segments.length - 1]}.tsx`;
  return join(directory, filename);
}

async function verifyDesignManifest() {
  for (const entry of designManifest) {
    const htmlPath = join(root, entry.htmlFile);
    const pngPath = entry.pngFile ? join(root, entry.pngFile) : null;
    const screenPath = routeToScreenPath(entry.route);

    assert(
      existsSync(htmlPath),
      `Expected HTML asset for ${entry.title} at ${entry.htmlFile}`,
    );

    if (pngPath) {
      assert(
        existsSync(pngPath),
        `Expected PNG asset for ${entry.title} at ${entry.pngFile}`,
      );
    }

    assert(
      existsSync(screenPath),
      `Expected Expo Router screen for ${entry.title} at ${screenPath.replace(root + '/', '')}`,
    );
  }

  console.info(`Verified ${designManifest.length} design entries.`);
}

async function main() {
  await verifyDesignManifest();
  const { runCoachScreenTests } = await import('./coach/coachScreens.test');
  await runCoachScreenTests();
}

void main();
console.info(`Verified ${designManifest.length} design entries.`);
runProfileScreenTests();

runPlanFeatureTests();

console.info('Plan feature smoke tests passed.');
