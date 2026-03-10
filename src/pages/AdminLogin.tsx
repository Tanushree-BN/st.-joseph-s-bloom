import { useState } from "react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, User } from "lucide-react";
import { toast } from "sonner";
import schoolLogo from "@/assets/school-logo.png";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    toast.info("Admin dashboard requires backend integration. Contact the administrator.");
  };

  return (
    <Layout>
      <section className="section-padding min-h-[70vh] flex items-center">
        <div className="container-school max-w-md mx-auto">
          <ScrollReveal>
            <div className="bg-card rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <img src={schoolLogo} alt="School Logo" className="w-20 h-20 mx-auto mb-4 object-contain" />
                <h1 className="font-display text-2xl font-bold">Admin Login</h1>
                <p className="text-sm text-muted-foreground font-body mt-1">Sign in to manage school content</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="text-sm font-medium font-body mb-1.5 block">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium font-body mb-1.5 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button variant="copper" type="submit" className="w-full" size="lg">
                  Sign In
                </Button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default AdminLogin;
