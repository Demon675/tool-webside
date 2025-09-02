import { motion } from 'framer-motion';
import { Code, Shield, Check, Zap, Database, Users } from 'lucide-react';

export default function Documentation() {
  return (
    <div className="min-h-screen py-20 px-4" data-testid="documentation-page">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 glow-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            data-testid="title"
          >
            Documentation
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            data-testid="subtitle"
          >
            Complete guide to NeoVault
          </motion.p>
        </div>

        <div className="grid gap-8">
          {/* Getting Started */}
          <motion.div 
            className="glass-effect rounded-xl p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            data-testid="section-getting-started"
          >
            <div className="flex items-center mb-4">
              <Zap className="text-accent mr-3" size={24} />
              <h3 className="text-2xl font-bold text-accent">Getting Started</h3>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                NeoVault is a state-of-the-art file management system designed for modern workflows.
                Built with security, performance, and user experience in mind.
              </p>
              <ul className="list-none text-muted-foreground space-y-2">
                <li className="flex items-center">
                  <Check className="text-accent mr-2" size={16} />
                  Secure admin authentication system
                </li>
                <li className="flex items-center">
                  <Check className="text-accent mr-2" size={16} />
                  Drag & drop file uploads
                </li>
                <li className="flex items-center">
                  <Check className="text-accent mr-2" size={16} />
                  Organized category management
                </li>
                <li className="flex items-center">
                  <Check className="text-accent mr-2" size={16} />
                  Responsive design for all devices
                </li>
              </ul>
            </div>
          </motion.div>

          {/* API Reference */}
          <motion.div 
            className="glass-effect rounded-xl p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            data-testid="section-api-reference"
          >
            <div className="flex items-center mb-4">
              <Code className="text-accent mr-3" size={24} />
              <h3 className="text-2xl font-bold text-accent">API Reference</h3>
            </div>
            <div className="bg-secondary rounded-lg p-4 font-mono text-sm">
              <div className="text-accent mb-2">// Upload file endpoint</div>
              <div className="text-foreground">POST /api/files/upload</div>
              <div className="text-muted-foreground mt-2">Body: FormData with file and categoryId</div>
              <div className="text-accent mb-2 mt-4">// Get categories</div>
              <div className="text-foreground">GET /api/categories</div>
              <div className="text-muted-foreground mt-2">Returns: Array of categories with files</div>
            </div>
          </motion.div>

          {/* Security Features */}
          <motion.div 
            className="glass-effect rounded-xl p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            data-testid="section-security"
          >
            <div className="flex items-center mb-4">
              <Shield className="text-accent mr-3" size={24} />
              <h3 className="text-2xl font-bold text-accent">Security Features</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mt-1">
                  <Check className="text-accent-foreground" size={12} />
                </div>
                <div>
                  <h4 className="font-semibold">Replit Authentication</h4>
                  <p className="text-muted-foreground text-sm">Secure OAuth integration</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mt-1">
                  <Check className="text-accent-foreground" size={12} />
                </div>
                <div>
                  <h4 className="font-semibold">Session Management</h4>
                  <p className="text-muted-foreground text-sm">Secure token-based authentication</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mt-1">
                  <Check className="text-accent-foreground" size={12} />
                </div>
                <div>
                  <h4 className="font-semibold">File Validation</h4>
                  <p className="text-muted-foreground text-sm">Comprehensive file type checking</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mt-1">
                  <Check className="text-accent-foreground" size={12} />
                </div>
                <div>
                  <h4 className="font-semibold">Access Control</h4>
                  <p className="text-muted-foreground text-sm">Admin-only file management</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Technical Stack */}
          <motion.div 
            className="glass-effect rounded-xl p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            data-testid="section-tech-stack"
          >
            <div className="flex items-center mb-4">
              <Database className="text-accent mr-3" size={24} />
              <h3 className="text-2xl font-bold text-accent">Technical Stack</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-accent">Frontend</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• React with TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• Framer Motion</li>
                  <li>• React Query</li>
                  <li>• React Dropzone</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-accent">Backend</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Express.js</li>
                  <li>• PostgreSQL</li>
                  <li>• Drizzle ORM</li>
                  <li>• Multer</li>
                  <li>• Replit Auth</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Usage Guide */}
          <motion.div 
            className="glass-effect rounded-xl p-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            data-testid="section-usage"
          >
            <div className="flex items-center mb-4">
              <Users className="text-accent mr-3" size={24} />
              <h3 className="text-2xl font-bold text-accent">Usage Guide</h3>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h4 className="font-semibold text-foreground mb-2">1. Admin Login</h4>
                <p>Use the admin login button to authenticate via Replit Auth. Only authenticated users can upload and manage files.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">2. Upload Files</h4>
                <p>Drag and drop files into the upload zone or click to browse. Select a category or create a new one.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">3. Organize Categories</h4>
                <p>Create categories to organize your files. Categories appear as collapsible sections for easy navigation.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">4. Manage Files</h4>
                <p>Download files with a single click or delete them when no longer needed. All changes are instant.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
