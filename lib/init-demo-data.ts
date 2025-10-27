// Initialize demo data for testing
export function initDemoData() {
  if (typeof window === "undefined") return

  // Check if already initialized
  if (localStorage.getItem("demoInitialized")) return

  // Create demo users
  const demoUsers = [
    {
      id: "admin-1",
      name: "Administrador",
      email: "admin@test.com",
      password: "admin123",
      phone: "+57 300 000 0000",
      role: "admin",
      balance: 0,
      createdAt: new Date().toISOString(),
    },
    {
      id: "client-1",
      name: "Cliente Demo",
      email: "cliente@test.com",
      password: "cliente123",
      phone: "+57 300 111 1111",
      role: "client",
      balance: 500,
      createdAt: new Date().toISOString(),
    },
  ]

  localStorage.setItem("users", JSON.stringify(demoUsers))
  localStorage.setItem("demoInitialized", "true")
}
