#!/usr/bin/env node

/**
 * Deployment Verification Script
 * Checks if the app is properly configured for production deployment
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verifying Deployment Configuration...\n');

// Check environment variables
function checkEnvFile() {
  console.log('📋 Checking .env file...');
  
  try {
    const envPath = path.join(process.cwd(), '.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    
    const requiredVars = [
      'SHOPIFY_APP_URL',
      'SHOPIFY_API_KEY',
      'SHOPIFY_API_SECRET',
      'DATABASE_URL',
      'SCOPES'
    ];
    
    const issues = [];
    
    requiredVars.forEach(varName => {
      const match = envContent.match(new RegExp(`^${varName}=(.+)$`, 'm'));
      if (!match) {
        issues.push(`❌ Missing ${varName}`);
      } else {
        const value = match[1];
        
        // Check for common issues
        if (varName === 'SHOPIFY_APP_URL') {
          if (value.includes('trycloudflare.com')) {
            issues.push(`❌ ${varName} contains tunnel URL: ${value}`);
          } else if (value.includes('""') || value.startsWith('"') && value.endsWith('"')) {
            issues.push(`❌ ${varName} has malformed quotes: ${value}`);
          } else if (!value.startsWith('https://')) {
            issues.push(`❌ ${varName} should start with https://: ${value}`);
          } else {
            console.log(`✅ ${varName}: ${value}`);
          }
        } else if (varName === 'FRONTEND_PORT') {
          if (value.includes('http')) {
            issues.push(`❌ ${varName} should be a port number, not URL: ${value}`);
          } else {
            console.log(`✅ ${varName}: ${value}`);
          }
        } else {
          console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
        }
      }
    });
    
    if (issues.length > 0) {
      console.log('\n🚨 Environment Issues Found:');
      issues.forEach(issue => console.log(issue));
      return false;
    }
    
    console.log('✅ Environment file looks good!\n');
    return true;
  } catch (error) {
    console.log('❌ Error reading .env file:', error.message);
    return false;
  }
}

// Check shopify.app.toml
function checkShopifyConfig() {
  console.log('📋 Checking shopify.app.toml...');
  
  try {
    const tomlPath = path.join(process.cwd(), 'shopify.app.toml');
    const tomlContent = fs.readFileSync(tomlPath, 'utf8');
    
    const issues = [];
    
    // Check application_url
    const appUrlMatch = tomlContent.match(/application_url\s*=\s*"([^"]+)"/);
    if (!appUrlMatch) {
      issues.push('❌ Missing application_url');
    } else {
      const appUrl = appUrlMatch[1];
      if (appUrl.includes('trycloudflare.com')) {
        issues.push(`❌ application_url contains tunnel URL: ${appUrl}`);
      } else if (appUrl === 'https://example.com') {
        issues.push(`❌ application_url is still placeholder: ${appUrl}`);
      } else {
        console.log(`✅ application_url: ${appUrl}`);
      }
    }
    
    // Check redirect_urls
    const redirectMatch = tomlContent.match(/redirect_urls\s*=\s*\[\s*"([^"]+)"\s*\]/);
    if (!redirectMatch) {
      issues.push('❌ Missing redirect_urls');
    } else {
      const redirectUrl = redirectMatch[1];
      if (redirectUrl.includes('trycloudflare.com')) {
        issues.push(`❌ redirect_urls contains tunnel URL: ${redirectUrl}`);
      } else if (redirectUrl.includes('example.com')) {
        issues.push(`❌ redirect_urls is still placeholder: ${redirectUrl}`);
      } else {
        console.log(`✅ redirect_urls: ${redirectUrl}`);
      }
    }
    
    if (issues.length > 0) {
      console.log('\n🚨 Shopify Config Issues Found:');
      issues.forEach(issue => console.log(issue));
      return false;
    }
    
    console.log('✅ Shopify config looks good!\n');
    return true;
  } catch (error) {
    console.log('❌ Error reading shopify.app.toml:', error.message);
    return false;
  }
}

// Check if app URL is accessible
function checkAppUrl() {
  return new Promise((resolve) => {
    console.log('🌐 Checking app URL accessibility...');
    
    const envPath = path.join(process.cwd(), '.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const urlMatch = envContent.match(/^SHOPIFY_APP_URL=(.+)$/m);
    
    if (!urlMatch) {
      console.log('❌ Could not find SHOPIFY_APP_URL in .env');
      resolve(false);
      return;
    }
    
    const appUrl = urlMatch[1].replace(/['"]/g, '');
    
    https.get(appUrl, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 400) {
        console.log(`✅ App URL accessible: ${appUrl} (${res.statusCode})\n`);
        resolve(true);
      } else {
        console.log(`⚠️ App URL returned ${res.statusCode}: ${appUrl}\n`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.log(`❌ App URL not accessible: ${appUrl}`);
      console.log(`   Error: ${err.message}\n`);
      resolve(false);
    });
  });
}

// Check for problematic files
function checkProblematicFiles() {
  console.log('📋 Checking for problematic files...');
  
  const problematicFiles = ['.env.local'];
  let hasIssues = false;
  
  problematicFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      console.log(`❌ Found problematic file: ${file}`);
      hasIssues = true;
    } else {
      console.log(`✅ No ${file} file (good)`);
    }
  });
  
  console.log('');
  return !hasIssues;
}

// Main verification function
async function verifyDeployment() {
  console.log('🚀 Pixel Analytics Deployment Verification\n');
  
  const checks = [
    checkEnvFile(),
    checkShopifyConfig(),
    checkProblematicFiles(),
    await checkAppUrl()
  ];
  
  const passed = checks.filter(Boolean).length;
  const total = checks.length;
  
  console.log('📊 Verification Results:');
  console.log(`   Passed: ${passed}/${total} checks`);
  
  if (passed === total) {
    console.log('\n🎉 All checks passed! Your app should deploy correctly.');
    console.log('\n📝 Next steps:');
    console.log('   1. Commit and push these changes');
    console.log('   2. Update Vercel environment variables');
    console.log('   3. Update Shopify Partner Dashboard URLs');
    console.log('   4. Redeploy on Vercel');
  } else {
    console.log('\n⚠️ Some checks failed. Please fix the issues above before deploying.');
  }
}

// Run verification
verifyDeployment().catch(console.error);