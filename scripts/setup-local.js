/**
 * Local Setup Script
 * 
 * This script helps initialize your local development environment.
 * Run with: node scripts/setup-local.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m'
};

console.log(`${colors.blue}====================================${colors.reset}`);
console.log(`${colors.blue}  Pirates of Parvati - Local Setup  ${colors.reset}`);
console.log(`${colors.blue}====================================${colors.reset}\n`);

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');
const envExample = `# Database connection (if using PostgreSQL)
DATABASE_URL=postgresql://username:password@localhost:5432/pirates_of_parvati

# Stripe API keys (for payment processing)
VITE_STRIPE_PUBLIC_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
`;

function createEnvFile() {
  console.log(`${colors.yellow}Creating .env file...${colors.reset}`);
  
  rl.question('Do you want to use PostgreSQL database? (y/n): ', (useDb) => {
    const usePostgres = useDb.toLowerCase() === 'y';
    
    rl.question('Enter Stripe publishable key (starts with pk_test_): ', (pubKey) => {
      rl.question('Enter Stripe secret key (starts with sk_test_): ', (secretKey) => {
        let envContent = '';
        
        if (usePostgres) {
          rl.question('Enter PostgreSQL connection URL (or press Enter for default): ', (dbUrl) => {
            const connectionUrl = dbUrl || 'postgresql://postgres:postgres@localhost:5432/pirates_of_parvati';
            envContent = `# Database connection
DATABASE_URL=${connectionUrl}\n\n`;
            completeSetup();
          });
        } else {
          completeSetup();
        }
        
        function completeSetup() {
          envContent += `# Stripe API keys
VITE_STRIPE_PUBLIC_KEY=${pubKey}
STRIPE_SECRET_KEY=${secretKey}\n`;
          
          fs.writeFileSync(envPath, envContent);
          console.log(`${colors.green}✅ .env file created successfully!${colors.reset}`);
          
          if (usePostgres) {
            console.log(`\n${colors.yellow}Running database migration...${colors.reset}`);
            try {
              execSync('npm run db:push', { stdio: 'inherit' });
              console.log(`${colors.green}✅ Database migration completed successfully!${colors.reset}`);
            } catch (error) {
              console.log(`${colors.red}❌ Database migration failed. Please check your connection settings.${colors.reset}`);
            }
          }
          
          console.log(`\n${colors.green}Setup completed! Start the application with:${colors.reset}`);
          console.log(`${colors.blue}npm run dev${colors.reset}`);
          
          rl.close();
        }
      });
    });
  });
}

if (!fs.existsSync(envPath)) {
  createEnvFile();
} else {
  rl.question('An .env file already exists. Do you want to overwrite it? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      createEnvFile();
    } else {
      console.log(`${colors.green}Using existing .env file.${colors.reset}`);
      rl.close();
    }
  });
}

// Update package.json to add dev-local script
function updatePackageJson() {
  try {
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    if (!packageJson.scripts['dev-local']) {
      console.log(`\n${colors.yellow}Adding dev-local script to package.json...${colors.reset}`);
      packageJson.scripts['dev-local'] = 'tsx server/index.local.ts';
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log(`${colors.green}✅ Added dev-local script to package.json${colors.reset}`);
    } else {
      console.log(`\n${colors.green}dev-local script already exists in package.json${colors.reset}`);
    }
  } catch (error) {
    console.log(`\n${colors.red}Failed to update package.json:${colors.reset} ${error.message}`);
    console.log(`${colors.yellow}You'll need to manually add the following to your package.json scripts:${colors.reset}`);
    console.log(`${colors.blue}"dev-local": "tsx server/index.local.ts"${colors.reset}`);
  }
}

// Handle cleanup
rl.on('close', () => {
  updatePackageJson();
  console.log(`\n${colors.blue}Thank you for using Pirates of Parvati!${colors.reset}`);
  process.exit(0);
});




