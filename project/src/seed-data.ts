import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wtfjmrfobccvjwdoqhij.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0ZmptcmZvYmNjdmp3ZG9xaGlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyODg3MjcsImV4cCI6MjA3Nzg2NDcyN30.MPk78c1pNIg9joVTn-a60vWO5sQ6v_WGkEHKT2gnxJk';

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedData() {
  console.log('Iniciando seed de datos...');

  const demoEmail = 'demo@example.com';
  const demoPassword = 'Demo123456!';

  let userId: string;

  const { data: existingUser } = await supabase.auth.signInWithPassword({
    email: demoEmail,
    password: demoPassword,
  });

  if (existingUser.user) {
    console.log('Usuario demo ya existe, usando ese usuario...');
    userId = existingUser.user.id;
  } else {
    console.log('Creando usuario demo...');
    const { data: newUser, error: signUpError } = await supabase.auth.signUp({
      email: demoEmail,
      password: demoPassword,
    });

    if (signUpError || !newUser.user) {
      console.error('Error al crear usuario:', signUpError);
      return;
    }

    userId = newUser.user.id;
    console.log('Usuario demo creado:', userId);
  }

  await supabase.auth.signInWithPassword({
    email: demoEmail,
    password: demoPassword,
  });

  const { data: existingBusiness } = await supabase
    .from('businesses')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle();

  let businessId: string;

  if (existingBusiness) {
    console.log('Negocio ya existe, usando ese negocio...');
    businessId = existingBusiness.id;
  } else {
    console.log('Creando negocio...');
    const { data: business, error: businessError } = await supabase
      .from('businesses')
      .insert({
        user_id: userId,
        name: 'Mi Empresa SaaS',
        email: 'contacto@miempresa.com',
        owner_name: 'Juan Pérez',
        phone: '+57 300 123 4567',
        address: 'Calle 100 #10-20, Bogotá',
      })
      .select()
      .single();

    if (businessError || !business) {
      console.error('Error al crear negocio:', businessError);
      return;
    }

    businessId = business.id;
    console.log('Negocio creado:', businessId);
  }

  console.log('Creando planes...');
  const plans = [
    {
      business_id: businessId,
      name: 'Plan Básico',
      price: 29900,
      description: 'Perfecto para comenzar tu negocio',
      period: 'monthly',
      features: [
        'Acceso a dashboard básico',
        'Hasta 100 transacciones/mes',
        'Soporte por email',
        '1 usuario',
      ],
      is_active: true,
    },
    {
      business_id: businessId,
      name: 'Plan Profesional',
      price: 79900,
      description: 'Para equipos en crecimiento',
      period: 'monthly',
      features: [
        'Acceso completo al dashboard',
        'Transacciones ilimitadas',
        'Soporte prioritario 24/7',
        'Hasta 5 usuarios',
        'Reportes avanzados',
        'API access',
      ],
      is_active: true,
    },
    {
      business_id: businessId,
      name: 'Plan Enterprise',
      price: 499900,
      description: 'Solución completa para grandes empresas',
      period: 'yearly',
      features: [
        'Todo lo del plan Profesional',
        'Usuarios ilimitados',
        'Soporte dedicado',
        'Personalización avanzada',
        'Onboarding personalizado',
        'SLA garantizado',
      ],
      is_active: true,
    },
  ];

  const { data: insertedPlans, error: plansError } = await supabase
    .from('plans')
    .insert(plans)
    .select();

  if (plansError) {
    console.error('Error al crear planes:', plansError);
    return;
  }

  console.log(`${insertedPlans?.length} planes creados`);

  if (insertedPlans && insertedPlans.length >= 2) {
    console.log('Creando suscriptores...');
    const now = new Date();
    const subscribers = [
      {
        business_id: businessId,
        plan_id: insertedPlans[0].id,
        name: 'Ana García',
        email: 'ana.garcia@example.com',
        status: 'active',
        started_at: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        business_id: businessId,
        plan_id: insertedPlans[1].id,
        name: 'Carlos Rodríguez',
        email: 'carlos.rodriguez@example.com',
        status: 'active',
        started_at: new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        business_id: businessId,
        plan_id: insertedPlans[1].id,
        name: 'María López',
        email: 'maria.lopez@example.com',
        status: 'active',
        started_at: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    const { data: insertedSubscribers, error: subscribersError } = await supabase
      .from('subscribers')
      .insert(subscribers)
      .select();

    if (subscribersError) {
      console.error('Error al crear suscriptores:', subscribersError);
      return;
    }

    console.log(`${insertedSubscribers?.length} suscriptores creados`);
  }

  console.log('Seed completado exitosamente!');
  console.log('\nCredenciales para login:');
  console.log('Email:', demoEmail);
  console.log('Password:', demoPassword);

  process.exit(0);
}

seedData().catch(console.error);
