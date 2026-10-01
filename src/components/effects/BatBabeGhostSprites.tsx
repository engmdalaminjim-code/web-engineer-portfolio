import React from 'react';

export type BatBabeGhostType = 'witch' | 'scarf' | 'cocktail' | 'purple-hair' | 'bat-bow' | 'goth';

interface BatBabeGhostProps {
  type: BatBabeGhostType;
  size?: number;
  className?: string;
  isFlapping?: boolean;
}

export const BatBabeGhost: React.FC<BatBabeGhostProps> = ({
  type,
  size = 90,
  className = '',
  isFlapping = true
}) => {
  const wingAnimClass = isFlapping ? 'animate-bat-wing-flap origin-center' : '';

  switch (type) {
    case 'witch':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-[0_8px_16px_rgba(236,72,153,0.35)] select-none pointer-events-none ${className}`}
        >
          <defs>
            <linearGradient id="witchGhostGrad" x1="100" y1="50" x2="100" y2="180" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.7" stopColor="#F8FAFC" />
              <stop offset="1" stopColor="#E2E8F0" />
            </linearGradient>
            <linearGradient id="witchHatGrad" x1="100" y1="10" x2="100" y2="70" gradientUnits="userSpaceOnUse">
              <stop stopColor="#334155" />
              <stop offset="1" stopColor="#0F172A" />
            </linearGradient>
          </defs>

          {/* Left Bat Wing */}
          <g className={wingAnimClass} style={{ transformOrigin: '55px 105px' }}>
            <path
              d="M55 105 C35 75 10 90 5 110 C15 112 25 125 22 135 C35 128 45 130 55 125 Z"
              fill="#1E293B"
            />
            <path
              d="M50 105 Q30 92 10 112"
              stroke="#334155"
              strokeWidth="2"
              fill="none"
            />
          </g>

          {/* Right Bat Wing */}
          <g className={wingAnimClass} style={{ transformOrigin: '145px 105px', animationDelay: '0.08s' }}>
            <path
              d="M145 105 C165 75 190 90 195 110 C185 112 175 125 178 135 C165 128 155 130 145 125 Z"
              fill="#1E293B"
            />
            <path
              d="M150 105 Q170 92 190 112"
              stroke="#334155"
              strokeWidth="2"
              fill="none"
            />
          </g>

          {/* Ghost Body */}
          <path
            d="M55 100 C55 60 70 50 100 50 C130 50 145 60 145 100 C145 135 155 160 150 170 C140 175 130 162 120 172 C110 178 100 165 90 172 C80 165 70 176 60 170 C50 160 55 135 55 100 Z"
            fill="url(#witchGhostGrad)"
            stroke="#CBD5E1"
            strokeWidth="2"
          />

          {/* Eyes with Lashes */}
          <circle cx="82" cy="98" r="9" fill="#0F172A" />
          <circle cx="85" cy="95" r="3.5" fill="#FFFFFF" />
          <circle cx="80" cy="100" r="1.5" fill="#FFFFFF" />
          {/* Eyelashes */}
          <path d="M73 90 Q80 87 88 90" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M72 88 L69 85 M76 86 L74 82" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />

          <circle cx="118" cy="98" r="9" fill="#0F172A" />
          <circle cx="121" cy="95" r="3.5" fill="#FFFFFF" />
          <circle cx="116" cy="100" r="1.5" fill="#FFFFFF" />
          {/* Eyelashes */}
          <path d="M112 90 Q120 87 127 90" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M128 88 L131 85 M124 86 L126 82" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />

          {/* Blushing Cheeks */}
          <circle cx="72" cy="108" r="7" fill="#FDA4AF" opacity="0.6" />
          <circle cx="128" cy="108" r="7" fill="#FDA4AF" opacity="0.6" />

          {/* Red Lipstick Lips */}
          <path
            d="M93 113 Q100 110 107 113 Q100 122 93 113 Z"
            fill="#E11D48"
          />
          <path d="M96 114 Q100 116 104 114" stroke="#FFE4E6" strokeWidth="1.5" fill="none" />

          {/* Black Witch Hat */}
          <g>
            {/* Hat Brim */}
            <ellipse cx="100" cy="62" rx="55" ry="14" fill="url(#witchHatGrad)" />
            {/* Hat Cone */}
            <path
              d="M70 60 C80 40 85 25 125 15 C115 30 118 45 130 60 Z"
              fill="url(#witchHatGrad)"
            />
            {/* Hat Ribbon */}
            <path
              d="M72 61 Q100 66 128 61 L129 55 Q100 60 71 55 Z"
              fill="#BE123C"
            />
            {/* Lipstick kiss accent on hat */}
            <path
              d="M96 56 Q100 53 104 56 Q100 60 96 56 Z"
              fill="#F43F5E"
            />
          </g>

          {/* Mini fluttering bats */}
          <path d="M30 45 C35 40 42 42 45 46 C42 48 38 48 35 52 C35 49 32 48 30 45 Z" fill="#0F172A" opacity="0.8" />
          <path d="M165 40 C170 35 177 37 180 41 C177 43 173 43 170 47 C170 44 167 43 165 40 Z" fill="#0F172A" opacity="0.8" />
        </svg>
      );

    case 'scarf':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-[0_8px_16px_rgba(249,115,22,0.35)] select-none pointer-events-none ${className}`}
        >
          <defs>
            <linearGradient id="scarfGhostGrad" x1="100" y1="40" x2="100" y2="180" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.75" stopColor="#F1F5F9" />
              <stop offset="1" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>

          {/* Mini Bats Above */}
          <path d="M45 40 C52 35 60 38 64 43 C60 45 56 45 53 50 C52 46 48 44 45 40 Z" fill="#1E293B" />
          <path d="M140 38 C147 33 155 36 159 41 C155 43 151 43 148 48 C147 44 143 42 140 38 Z" fill="#1E293B" />

          {/* Left Wing */}
          <g className={wingAnimClass} style={{ transformOrigin: '50px 100px' }}>
            <path d="M50 100 C30 75 10 90 5 110 C15 115 25 125 22 135 C35 128 45 130 50 120 Z" fill="#1E293B" />
          </g>

          {/* Right Wing */}
          <g className={wingAnimClass} style={{ transformOrigin: '150px 100px', animationDelay: '0.08s' }}>
            <path d="M150 100 C170 75 190 90 195 110 C185 115 175 125 178 135 C165 128 155 130 150 120 Z" fill="#1E293B" />
          </g>

          {/* Ghost Body */}
          <path
            d="M50 100 C50 50 68 35 100 35 C132 35 150 50 150 100 C150 145 158 165 152 172 C142 178 132 165 120 173 C110 178 100 166 90 173 C80 166 70 178 60 172 C52 164 50 145 50 100 Z"
            fill="url(#scarfGhostGrad)"
            stroke="#CBD5E1"
            strokeWidth="2"
          />

          {/* Speckles at bottom */}
          <circle cx="85" cy="155" r="2" fill="#94A3B8" opacity="0.6" />
          <circle cx="115" cy="158" r="2.5" fill="#94A3B8" opacity="0.6" />
          <circle cx="98" cy="162" r="1.5" fill="#94A3B8" opacity="0.6" />
          <circle cx="130" cy="152" r="2" fill="#94A3B8" opacity="0.6" />

          {/* Kawaii Eyes */}
          <circle cx="80" cy="85" r="9" fill="#0F172A" />
          <circle cx="83" cy="82" r="3.5" fill="#FFFFFF" />
          <circle cx="78" cy="88" r="1.5" fill="#FFFFFF" />

          <circle cx="120" cy="85" r="9" fill="#0F172A" />
          <circle cx="123" cy="82" r="3.5" fill="#FFFFFF" />
          <circle cx="118" cy="88" r="1.5" fill="#FFFFFF" />

          {/* Cute Smile */}
          <path d="M96 95 Q100 100 104 95" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Blushing Cheeks */}
          <circle cx="70" cy="94" r="6" fill="#FCA5A5" opacity="0.6" />
          <circle cx="130" cy="94" r="6" fill="#FCA5A5" opacity="0.6" />

          {/* Orange & Black Striped Halloween Scarf */}
          <g>
            {/* Scarf Loop */}
            <path
              d="M58 105 Q100 115 142 105 C145 118 140 125 138 128 Q100 138 62 128 C60 125 55 118 58 105 Z"
              fill="#EA580C"
              stroke="#9A3412"
              strokeWidth="1.5"
            />
            {/* Scarf Stripes */}
            <path d="M72 108 L76 130 M88 111 L92 133 M108 111 L112 133 M124 108 L128 130" stroke="#0F172A" strokeWidth="6" />

            {/* Hanging Scarf Tail */}
            <path
              d="M72 125 L68 165 C68 170 82 170 84 165 L86 127 Z"
              fill="#EA580C"
              stroke="#9A3412"
              strokeWidth="1.5"
            />
            <path d="M70 138 L85 139 M69 152 L84 153" stroke="#0F172A" strokeWidth="5" />
            {/* Little Bat on Scarf */}
            <path d="M73 146 Q77 144 81 146 Q77 149 73 146 Z" fill="#FDE047" />
          </g>
        </svg>
      );

    case 'cocktail':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-[0_8px_16px_rgba(244,63,94,0.35)] select-none pointer-events-none ${className}`}
        >
          {/* Wings */}
          <g className={wingAnimClass} style={{ transformOrigin: '55px 95px' }}>
            <path d="M55 95 C35 70 12 85 8 105 C18 110 28 120 25 130 C38 123 48 125 55 115 Z" fill="#1E293B" />
          </g>
          <g className={wingAnimClass} style={{ transformOrigin: '145px 95px', animationDelay: '0.08s' }}>
            <path d="M145 95 C165 70 188 85 192 105 C182 110 172 120 175 130 C162 123 152 125 145 115 Z" fill="#1E293B" />
          </g>

          {/* Ghost Body */}
          <path
            d="M55 90 C55 45 72 35 100 35 C128 35 145 45 145 90 C145 135 155 160 148 168 C138 174 128 162 118 170 C108 175 98 164 88 170 C78 164 68 174 58 168 C50 160 55 135 55 90 Z"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="2"
          />

          {/* Red Ribbon Bow on Head */}
          <g>
            <path d="M90 32 C80 22 75 35 88 38 Z" fill="#E11D48" />
            <path d="M110 32 C120 22 125 35 112 38 Z" fill="#E11D48" />
            <circle cx="100" cy="35" r="4.5" fill="#BE123C" />
          </g>

          {/* Stylish Glasses */}
          <circle cx="78" cy="85" r="14" stroke="#0F172A" strokeWidth="3" fill="none" />
          <circle cx="122" cy="85" r="14" stroke="#0F172A" strokeWidth="3" fill="none" />
          <path d="M92 84 Q100 82 108 84" stroke="#0F172A" strokeWidth="3" fill="none" />
          <path d="M64 82 L55 80 M136 82 L145 80" stroke="#0F172A" strokeWidth="2.5" />

          {/* Eyes behind Glasses */}
          <circle cx="78" cy="85" r="7" fill="#0F172A" />
          <circle cx="81" cy="83" r="2.5" fill="#FFFFFF" />
          <circle cx="122" cy="85" r="7" fill="#0F172A" />
          <circle cx="125" cy="83" r="2.5" fill="#FFFFFF" />

          {/* Cute Open Mouth Smile */}
          <path d="M94 100 Q100 110 106 100 Q100 104 94 100 Z" fill="#E11D48" />

          {/* Blushing Cheeks */}
          <circle cx="68" cy="98" r="6" fill="#FDA4AF" opacity="0.7" />
          <circle cx="132" cy="98" r="6" fill="#FDA4AF" opacity="0.7" />

          {/* Cocktail Glass in Hand */}
          <g transform="translate(130, 95)">
            {/* Glass Stem and Base */}
            <path d="M25 45 L25 65 M15 65 L35 65" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
            {/* Glass Bowl with Drink */}
            <path d="M12 25 Q10 45 25 45 Q40 45 38 25 Z" fill="#FB7185" stroke="#E2E8F0" strokeWidth="1.5" />
            {/* Straw */}
            <path d="M22 25 L10 8 L5 12" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Umbrella */}
            <path d="M35 12 L28 22" stroke="#64748B" strokeWidth="1.5" />
            <path d="M22 10 Q32 0 42 14 Z" fill="#8B5CF6" />
            {/* Orange Slice */}
            <circle cx="34" cy="22" r="6" fill="#F97316" />
          </g>
        </svg>
      );

    case 'purple-hair':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-[0_8px_16px_rgba(168,85,247,0.4)] select-none pointer-events-none ${className}`}
        >
          {/* Wings */}
          <g className={wingAnimClass} style={{ transformOrigin: '50px 105px' }}>
            <path d="M50 105 C30 80 10 95 5 115 C15 120 25 130 22 140 C35 133 45 135 50 125 Z" fill="#581C87" />
          </g>
          <g className={wingAnimClass} style={{ transformOrigin: '150px 105px', animationDelay: '0.08s' }}>
            <path d="M150 105 C170 80 190 95 195 115 C185 120 175 130 178 140 C165 133 155 135 150 125 Z" fill="#581C87" />
          </g>

          {/* Ghost Body (Lavender glow) */}
          <path
            d="M55 95 C55 50 72 40 100 40 C128 40 145 50 145 95 C145 140 155 165 148 172 C138 178 128 166 118 174 C108 179 98 168 88 174 C78 168 68 178 58 172 C50 164 55 140 55 95 Z"
            fill="#FAF5FF"
            stroke="#E9D5FF"
            strokeWidth="2"
          />

          {/* Flowing Violet Hair */}
          <g>
            <path
              d="M62 58 C55 35 90 25 105 32 C125 25 148 40 145 65 C142 80 135 85 142 98 C145 105 140 120 132 125 C130 115 132 105 128 95 C125 75 120 60 100 62 C80 60 75 75 72 95 C68 105 70 115 68 125 C60 120 55 105 58 98 C65 85 58 80 55 65 Z"
              fill="#A855F7"
            />
            <path
              d="M75 42 C85 35 115 35 125 42 C115 50 85 50 75 42 Z"
              fill="#C084FC"
            />
            {/* Hair highlight swirls */}
            <path d="M52 65 C45 85 55 125 65 145 C68 135 60 115 60 95" stroke="#7E22CE" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M148 65 C155 85 145 125 135 145 C132 135 140 115 140 95" stroke="#7E22CE" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Bat hairclips */}
            <path d="M55 45 C60 42 66 43 69 47 C66 48 63 48 61 52 Z" fill="#1E293B" />
            <path d="M145 45 C140 42 134 43 131 47 C134 48 137 48 139 52 Z" fill="#1E293B" />
          </g>

          {/* Shy Anime Eyes */}
          <circle cx="82" cy="95" r="8" fill="#3B0764" />
          <circle cx="85" cy="92" r="3" fill="#FFFFFF" />
          <circle cx="80" cy="97" r="1.5" fill="#FFFFFF" />

          <circle cx="118" cy="95" r="8" fill="#3B0764" />
          <circle cx="121" cy="92" r="3" fill="#FFFFFF" />
          <circle cx="116" cy="97" r="1.5" fill="#FFFFFF" />

          {/* Blushing Anime Cheeks */}
          <ellipse cx="74" cy="104" rx="7" ry="5" fill="#F472B6" opacity="0.7" />
          <ellipse cx="126" cy="104" rx="7" ry="5" fill="#F472B6" opacity="0.7" />

          {/* Sweet Shy Smile */}
          <path d="M97 103 Q100 106 103 103" stroke="#581C87" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'bat-bow':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-[0_8px_16px_rgba(99,102,241,0.35)] select-none pointer-events-none ${className}`}
        >
          {/* Wings */}
          <g className={wingAnimClass} style={{ transformOrigin: '50px 105px' }}>
            <path d="M50 105 C30 80 10 95 5 115 C15 120 25 130 22 140 C35 133 45 135 50 125 Z" fill="#1E293B" />
          </g>
          <g className={wingAnimClass} style={{ transformOrigin: '150px 105px', animationDelay: '0.08s' }}>
            <path d="M150 105 C170 80 190 95 195 115 C185 120 175 130 178 140 C165 133 155 135 150 125 Z" fill="#1E293B" />
          </g>

          {/* Ghost Body */}
          <path
            d="M50 90 C50 45 68 35 100 35 C132 35 150 45 150 90 C150 135 160 160 152 170 C142 176 130 162 120 170 C110 176 100 164 90 170 C80 164 68 176 58 170 C50 160 50 135 50 90 Z"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="2"
          />

          {/* Giant Bat-Pattern Bow on Head */}
          <g>
            <path d="M96 35 C70 15 65 45 92 42 Z" fill="#0F172A" />
            <path d="M104 35 C130 15 135 45 108 42 Z" fill="#0F172A" />
            <circle cx="100" cy="38" r="6" fill="#1E293B" />
            {/* White mini bats on bow */}
            <path d="M78 28 Q82 26 86 28 Q82 31 78 28 Z" fill="#FFFFFF" />
            <path d="M114 28 Q118 26 122 28 Q118 31 114 28 Z" fill="#FFFFFF" />
          </g>

          {/* Eyes */}
          <circle cx="82" cy="85" r="9" fill="#0F172A" />
          <circle cx="85" cy="82" r="3.5" fill="#FFFFFF" />
          <circle cx="80" cy="88" r="1.5" fill="#FFFFFF" />

          <circle cx="118" cy="85" r="9" fill="#0F172A" />
          <circle cx="121" cy="82" r="3.5" fill="#FFFFFF" />
          <circle cx="116" cy="88" r="1.5" fill="#FFFFFF" />

          {/* Cute Smile */}
          <path d="M96 95 Q100 99 104 95" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Blushing Cheeks */}
          <circle cx="72" cy="94" r="6" fill="#FCA5A5" opacity="0.6" />
          <circle cx="128" cy="94" r="6" fill="#FCA5A5" opacity="0.6" />

          {/* Waist Bow Ribbon */}
          <g>
            <path d="M96 120 C75 105 70 130 92 127 Z" fill="#0F172A" />
            <path d="M104 120 C125 105 130 130 108 127 Z" fill="#0F172A" />
            <circle cx="100" cy="122" r="5" fill="#1E293B" />
            {/* Bat pattern hem line */}
            <path d="M60 148 Q70 144 80 148 Q90 144 100 148 Q110 144 120 148 Q130 144 140 148" stroke="#0F172A" strokeWidth="3" fill="none" />
          </g>
        </svg>
      );

    case 'goth':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-[0_8px_20px_rgba(30,41,59,0.6)] select-none pointer-events-none ${className}`}
        >
          {/* Large Dark Bat Wings */}
          <g className={wingAnimClass} style={{ transformOrigin: '50px 105px' }}>
            <path d="M50 105 C25 75 5 95 2 118 C14 123 24 135 20 145 C35 138 45 140 50 128 Z" fill="#0F172A" />
            <path d="M45 105 Q25 90 5 120" stroke="#334155" strokeWidth="2" fill="none" />
          </g>
          <g className={wingAnimClass} style={{ transformOrigin: '150px 105px', animationDelay: '0.08s' }}>
            <path d="M150 105 C175 75 195 95 198 118 C186 123 176 135 180 145 C165 138 155 140 150 128 Z" fill="#0F172A" />
            <path d="M155 105 Q175 90 195 120" stroke="#334155" strokeWidth="2" fill="none" />
          </g>

          {/* Ghost Body */}
          <path
            d="M55 95 C55 50 72 40 100 40 C128 40 145 50 145 95 C145 140 155 165 148 174 C138 180 128 166 118 174 C108 180 98 168 88 174 C78 168 68 180 58 174 C50 165 55 140 55 95 Z"
            fill="#F8FAFC"
            stroke="#94A3B8"
            strokeWidth="2"
          />

          {/* Sleek Goth Black Hair & Horns */}
          <g>
            {/* Horns */}
            <path d="M72 45 C68 28 80 32 86 42 Z" fill="#0F172A" />
            <path d="M128 45 C132 28 120 32 114 42 Z" fill="#0F172A" />

            {/* Hair */}
            <path
              d="M62 55 C60 35 90 28 100 32 C110 28 140 35 138 55 C135 75 130 95 140 115 C145 125 140 135 135 130 C130 110 125 90 122 75 C120 60 115 50 100 52 C85 50 80 60 78 75 C75 90 70 110 65 130 C60 135 55 125 60 115 C70 95 65 75 62 55 Z"
              fill="#0F172A"
            />
          </g>

          {/* Goth Eyeliner & Eyes */}
          <g>
            <circle cx="82" cy="92" r="8" fill="#0F172A" />
            <circle cx="84" cy="89" r="2.5" fill="#FFFFFF" />
            {/* Heavy Winged Eyeliner */}
            <path d="M70 85 Q82 82 92 88" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M68 86 L62 82" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />

            <circle cx="118" cy="92" r="8" fill="#0F172A" />
            <circle cx="120" cy="89" r="2.5" fill="#FFFFFF" />
            {/* Heavy Winged Eyeliner */}
            <path d="M108 88 Q118 82 130 85" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M132 86 L138 82" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Dark Black Lipstick Lips */}
          <path
            d="M94 112 Q100 108 106 112 Q100 120 94 112 Z"
            fill="#0F172A"
          />

          {/* Subtle Goth Blush */}
          <circle cx="72" cy="102" r="5" fill="#E2E8F0" opacity="0.4" />
          <circle cx="128" cy="102" r="5" fill="#E2E8F0" opacity="0.4" />
        </svg>
      );
  }
};
