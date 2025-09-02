import { motion } from 'framer-motion';
import { Shield, ArrowRight, Zap, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" data-testid="landing-page">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text" data-testid="title">
            Neo<span className="text-accent">Vault</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8" data-testid="subtitle">
            Next-generation secure file management system
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto" data-testid="description">
            Experience the future of file storage with advanced security, 
            intuitive management, and sleek futuristic design.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/docs">
              <Button 
                className="bg-accent text-accent-foreground px-8 py-3 rounded-lg neon-glow font-medium text-lg"
                data-testid="button-get-started"
              >
                Get Started
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link href="/docs">
              <Button 
                variant="outline"
                className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg border border-border hover:border-accent transition-colors duration-300 font-medium text-lg"
                data-testid="button-learn-more"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Animated Hero Element */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <motion.div
              className="glass-effect rounded-2xl p-8 transform hover:scale-105 transition-transform duration-500"
              whileHover={{ rotate: 2 }}
              data-testid="feature-security"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-accent rounded-xl mx-auto mb-4 glow-text">
                <Shield className="text-accent-foreground" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ultra Secure</h3>
              <p className="text-muted-foreground">Advanced encryption & authentication</p>
            </motion.div>

            <motion.div
              className="glass-effect rounded-2xl p-8 transform hover:scale-105 transition-transform duration-500"
              whileHover={{ rotate: -2 }}
              data-testid="feature-speed"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-accent rounded-xl mx-auto mb-4 glow-text">
                <Zap className="text-accent-foreground" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">Optimized for performance</p>
            </motion.div>

            <motion.div
              className="glass-effect rounded-2xl p-8 transform hover:scale-105 transition-transform duration-500"
              whileHover={{ rotate: 2 }}
              data-testid="feature-privacy"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-accent rounded-xl mx-auto mb-4 glow-text">
                <Lock className="text-accent-foreground" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-muted-foreground">Your data stays protected</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
