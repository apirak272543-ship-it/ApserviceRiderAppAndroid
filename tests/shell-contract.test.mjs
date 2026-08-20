import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const appSource = readFileSync(new URL("../App.tsx", import.meta.url), "utf8");
const appConfig = readFileSync(new URL("../app.json", import.meta.url), "utf8");

test("Rider shell opens only the Rider web destination", () => {
  assert.match(appSource, /https:\/\/apirak272543-ship-it\.github\.io\/ap-rider-mobile\/rider\//);
  assert.doesNotMatch(appSource, /ap-store-mobile\/merchant|Apservicebeta\/admin|ap-retail-pos/);
});

test("Rider shell limits WebView navigation to AP Service hosts", () => {
  assert.match(appSource, /const ALLOWED_HOSTS = new Set\(\["apirak272543-ship-it\.github\.io", "abtsctwfkgzciseppach\.supabase\.co"\]\)/);
  assert.match(appSource, /parsed\.protocol === "https:" && ALLOWED_HOSTS\.has\(parsed\.hostname\)/);
  assert.match(appSource, /onShouldStartLoadWithRequest=\{handleNavigation\}/);
  assert.match(appSource, /Linking\.openURL\(request\.url\)/);
  assert.ok(!appSource.includes('originWhitelist={["https://*", "http://*"]}'));
});

test("Rider shell retains foreground location support", () => {
  assert.match(appSource, /geolocationEnabled/);
  assert.match(appConfig, /ACCESS_FINE_LOCATION/);
  assert.match(appConfig, /FOREGROUND_SERVICE_LOCATION/);
});

test("Rider shell keeps notification support and avoids background location permission", () => {
  assert.match(appSource, /onMessage/);
  assert.match(appSource, /notification/);
  assert.match(appConfig, /expo-notifications/);
  assert.match(appConfig, /POST_NOTIFICATIONS/);
  assert.doesNotMatch(appConfig, /ACCESS_BACKGROUND_LOCATION/);
});
