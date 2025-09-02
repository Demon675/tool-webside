import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/Navigation";
import { ParticleBackground } from "@/components/ParticleBackground";
import Landing from "@/pages/Landing";
import Documentation from "@/pages/Documentation";
import Downloads from "@/pages/Downloads";
import PublicDownloads from "@/pages/PublicDownloads";
import Login from "@/pages/Login";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <>
      <Navigation />
      <ParticleBackground />
      <main className="pt-16">
        <Switch>
          <Route path="/" component={Landing} />
          <Route path="/docs" component={Documentation} />
          <Route path="/downloads" component={PublicDownloads} />
          <Route path="/login" component={Login} />
          {isAuthenticated && <Route path="/admin" component={Downloads} />}
          {isAuthenticated && <Route path="/settings" component={Settings} />}
          <Route component={NotFound} />
        </Switch>
      </main>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
