// components/FollowerGrowthSimulator.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Settings2,
  Plus,
  Home,
  Search,
  Video,
  User,
  BellDot,
  Sparkles,
  SquarePlay,
  Play,
  Grid3X3,
  Repeat2,
  ContactRound,
} from 'lucide-react';

interface MockUser {
  username: string;
}

interface FollowerData {
  id: number;
  username: string;
  avatar: string;
  time: string;
  timestamp: string;
}

const mockUsers: MockUser[] = [
  { username: 'carlosdelacruz3' },
  { username: 'davidgomezl437' },
  { username: 'arantxaserranop40' },
  { username: 'elenaromanr62' },
  { username: 'jorgeblancos8775' },
  { username: 'luiscruzd907' },
  { username: 'alvaropascualm' },
  { username: 'diegoserran' },
  { username: 'carmensierrab6' },
  { username: 'agustinsierrap207' },
  { username: 'isabelperezs12' },
  { username: 'conchitaortizg878' },
  { username: 'davidiglesiasg707' },
  { username: 'gloriamoralesp7268' },
  { username: 'sebastianfgarciam208' },
  { username: 'adrianadelatorref1526' },
  { username: 'pilarriosg70' },
  { username: 'saramaldonadog74' },
  { username: 'enavio_uzm9155' },
  { username: 'carmencarmonas95' },
  { username: 'jmesapietog49' },
  { username: 'armandodiazm2025' },
  { username: 'olgaguerram5920' },
  { username: 'valentinadiazd3973' },
  { username: 'mariasanchezl6435' },
  { username: 'carloscastro1976' },
  { username: 'irenegonzalezs2471' },
  { username: 'andreariosa1982' },
  { username: 'laiagonzalezh580' },
  { username: 'rafaelblancom898' },
  { username: 'clarareyg535' },
  { username: 'luciamedinap5122' },
  { username: 'samuelperezr54' },
  { username: 'alvarogarciag7120' },
  { username: 'enriquesierras190' },
  { username: 'rubenpastord340' },
  { username: 'elsaperezg712' },
  { username: 'adrianguerrar1019' },
  { username: 'jeronimoreyc213' },
  { username: 'celiamolinerog39' },
  { username: 'celiaguerreroh770' },
  { username: 'carmenperezp348' },
  { username: 'lauragarcian6393' },
  { username: 'graciaalva' },
  { username: 'eduardogu' },
  { username: 'mariaguerreror941' },
  { username: 'lucianacrespor283' },
  { username: 'alvaroperezv2283' },
  { username: 'martasaezs9539' },
  { username: 'hugoariasc7' },
  { username: 'luciocabrerar13' },
  { username: 'victorhernandez' },
  { username: 'anaestebang3771' },
  { username: 'rosamoyav3085' },
  { username: 'davidguerrag16' },
  { username: 'claragarciaab32' },
  { username: 'pablosierras6949' },
  { username: 'juliamaldonadod7532' },
  { username: 'noelortegas9' },
  { username: 'marianan' },
  { username: 'axelgutierrezt951' },
  { username: 'rociomartinezg75' },
  { username: 'martinamolinerob2' },
  { username: 'robertomolineroh401' },
  { username: 'aliciahernandezg865' },
  { username: 'carlosprietob63' },
  { username: 'mariagarciaac?' },
  { username: 'cristianrivasc18' },
  { username: 'hectorguerrag7099' },
  { username: 'lauradiazp3628' },
  { username: 'adriandominguezl89' },
  { username: 'celiasaezl3060' },
  { username: 'monicaalvarezd801' },
  { username: 'paulagarciaac728' },
  { username: 'sofiagalang1128' },
  { username: 'carolinaozanop76' },
  { username: 'jaimeyr23' },
  { username: 'jessicastrov665' },
  { username: 'alvarodelacruzp3731' },
  { username: 'isaaclopezh393' },
  { username: 'lauracastilloc20' },
  { username: 'cristianr' },
  { username: 'hectoro' },
  { username: 'elena' },
  { username: 'silviagilg3' },
  { username: 'paulagarciaar5712' },
  { username: 'fatimafernandezr251' },
];

const FollowerGrowthSimulator = () => {
  const router = useRouter();
  const [followers, setFollowers] = useState<FollowerData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'followings'>('profile');

  useEffect(() => {
    setIsLoading(false);

    const tabTimer = setTimeout(() => {
      setActiveTab('followings');
    }, 7000);

    const interval = setInterval(() => {
      if (mockUsers.length > 0) {
        const randomIndex = Math.floor(Math.random() * mockUsers.length);
        const newUser = mockUsers[randomIndex];
        const timestamp = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        const avatarUrl = `https://randomuser.me/api/portraits/${
          Math.random() > 0.5 ? 'men' : 'women'
        }/${Math.floor(Math.random() * 70)}.jpg`;

        setFollowers((prev) => [
          {
            id: Date.now(),
            username: newUser.username,
            avatar: avatarUrl,
            time: `${Math.floor(Math.random() * 50)} s`,
            timestamp,
          },
          ...prev.slice(0, 9),
        ]);
      }
    }, 1000 + Math.random() * 2000);

    return () => {
      clearTimeout(tabTimer);
      clearInterval(interval);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen py-6">
<div className="bg-white max-h-[900px] h-auto font-sans relative max-w-md mx-auto w-full overflow-y-auto" suppressHydrationWarning>      {/* Header */}
      <div className="sticky top-0 bg-white z-10 shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <span className="font-bold text-base sm:text-lg">libarmarti</span>
          <span className="text-gray-500">▼</span>
        </div>
        <div className="flex space-x-3 sm:space-x-4">
          <div className="relative">
            <BellDot size={18} className="sm:w-5 sm:h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
              9+
            </span>
          </div>
          <Plus size={18} className="sm:w-5 sm:h-5" />
          <button className="text-lg sm:text-xl">☰</button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="px-3 py-3 sm:px-4 sm:py-4">
        {activeTab === 'profile' ? (
          <>
            {/* Perfil */}
            <div className="flex items-center mb-4">
              <div className="relative mr-4">
                <img
                  src="/instagram/1.webp"
                  alt="Lib Marti"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full"
                />
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-1">
                  <Plus size={16} className="text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="font-bold text-base sm:text-lg">Lib Marti</h1>
                <div className="flex space-x-4 sm:space-x-6 mt-2 text-xs sm:text-sm">
                  <div>
                    <div className="font-bold">30</div>
                    <div className="text-gray-500">publicaciones</div>
                  </div>
                  <div>
                    <div className="font-bold" suppressHydrationWarning>
                      17.4 mil
                    </div>
                    <div className="text-gray-500">seguidores</div>
                  </div>
                  <div>
                    <div className="font-bold">409</div>
                    <div className="text-gray-500">seguidos</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Biografía */}
            <div className="mb-4">
              <div className="flex items-center mb-1">
                <div className="rounded-full px-2 py-1 text-xs">ℹ️</div>
                <span className="ml-2 text-xs sm:text-sm">Creador Digital</span>
              </div>
              <div className="flex items-center mb-1">
                <div className="bg-bone-100 rounded-full px-2 py-1 text-black text-xs">@</div>
                <span className="ml-2 text-xs sm:text-sm text-black">libarmarti</span>
                <span className="mx-2">•</span>
                <div className="bg-bone-100 rounded-full px-2 py-1 text-black text-xs">
                  <Sparkles size={12} />
                </div>
                <span className="ml-1 text-xs sm:text-sm text-black">Socialita IA</span>
              </div>
            </div>

            {/* Panel profesional */}
            <div className="bg-gray-100 p-3 rounded-lg mb-4">
              <div className="font-bold text-sm">Panel profesional</div>
              <div className="text-xs sm:text-sm text-gray-600 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                138 visualizaciones en los últimos 30 días.
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex space-x-2 mb-4">
              <button className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md text-xs sm:text-sm font-medium">
                Editar perfil
              </button>
              <button className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md text-xs sm:text-sm font-medium">
                Compartir perfil
              </button>
            </div>

            {/* Pestañas de contenido */}
            <div className="flex border-b mb-4">
              <button className="flex-1 p-2 sm:p-3 text-center">
                <Grid3X3 size={20} className="mx-auto" />
              </button>
              <button className="flex-1 p-2 sm:p-3 text-center">
                <Play size={20} className="mx-auto" />
              </button>
              <button className="flex-1 p-2 sm:p-3 text-center">
                <Repeat2 size={20} className="mx-auto" />
              </button>
              <button className="flex-1 p-2 sm:p-3 text-center">
                <ContactRound size={20} className="mx-auto" />
              </button>
            </div>

            {/* Grid de publicaciones con fotos reales */}
            <div className="grid grid-cols-3 gap-1">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="aspect-square relative">
                  <img
                    src={`https://picsum.photos/seed/${i}/400/400.webp`}
                    alt={`post-${i}`}
                    className="w-full h-full object-cover rounded-sm"
                  />
                  <div className="absolute top-1 left-1 text-white text-xs px-1 rounded">
                    {i % 2 === 0 ? <Play size={12} className="sm:w-3.5 sm:h-3.5" /> : <SquarePlay size={12} className="sm:w-3.5 sm:h-3.5" />}
                  </div>
                  <div
                    className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded"
                    suppressHydrationWarning
                  >
                    {Math.floor(Math.random() * 500)}k
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex border-b px-4 py-2 overflow-x-auto whitespace-nowrap">
              <button
                onClick={() => setActiveTab('profile')}
                className="px-2 py-1 mr-2 rounded-full bg-gray-100 text-xs sm:text-sm"
              >
                Has que sigues
              </button>
              <button className="px-2 py-1 mr-2 rounded-full bg-gray-100 text-xs sm:text-sm">
                Comentarios
              </button>
              <button className="px-2 py-1 mr-2 rounded-full bg-gray-100 text-xs sm:text-sm">
                Profesionales
              </button>
              <button className="px-2 py-1 mr-2 rounded-full bg-indigo-100 text-indigo-700 font-medium text-xs sm:text-sm">
                Seguimientos
              </button>
              <button className="px-2 py-1 mr-2 rounded-full bg-gray-100 text-xs sm:text-sm">
                Etiquetas y menciones
              </button>
              <button className="px-2 py-1 mr-2 rounded-full bg-gray-100 text-xs sm:text-sm">
                Verificadas
              </button>
            </div>

            {/* Content */}
            <div className="mt-4">
              <h2 className="font-semibold mb-3 text-sm sm:text-base">Hoy</h2>

              <div className="space-y-3">
                {followers.map((follower) => (
                  <div
                    key={follower.id}
                    className="flex items-center justify-between py-2 border-b border-gray-100"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={follower.avatar}
                        alt={follower.username}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                      />
                      <div>
                        <p className="text-xs sm:text-sm font-medium">{follower.username}</p>
                        <p
                          className="text-xs text-gray-500"
                          suppressHydrationWarning
                        >
                          comenzó a seguirte. {follower.time}
                        </p>
                      </div>
                    </div>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs sm:text-sm font-medium">
                      Seguir también
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Barra inferior */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
        <button className="flex flex-col items-center">
          <Home size={20} className="sm:w-6 sm:h-6" />
          <span className="text-xs mt-1">Inicio</span>
        </button>
        <button className="flex flex-col items-center">
          <Search size={20} className="sm:w-6 sm:h-6" />
          <span className="text-xs mt-1">Buscar</span>
        </button>
        <button className="flex flex-col items-center">
          <Plus size={20} className="sm:w-6 sm:h-6" />
          <span className="text-xs mt-1">Publicar</span>
        </button>
        <button className="flex flex-col items-center">
          <Video size={20} className="sm:w-6 sm:h-6" />
          <span className="text-xs mt-1">Reels</span>
        </button>
        <button className="flex flex-col items-center">
          <img
            src="/instagram/1.webp"
            alt="Perfil"
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover"
          />
          <span className="text-xs mt-1">Perfil</span>
        </button>
      </div>
    </div>
    </div>
  );
};

export default FollowerGrowthSimulator;
