export default function RecordIllustration() {
  return (
    <figure class="record-illustration">
      <svg
        viewBox="0 0 520 380"
        role="img"
        aria-labelledby="record-art-title record-art-desc"
      >
        <title id="record-art-title">The record and what surrounds it</title>
        <desc id="record-art-desc">
          A form captures a small part of a wider set of connected conditions.
          This is a conceptual illustration, not incident data.
        </desc>
        <g fill="none" stroke="#638cb7" stroke-width="1.5">
          <path d="M38 90C160 80 100 230 256 185S378 36 484 87" />
          <path d="M38 291C175 300 154 116 258 185S383 294 480 260" />
          <path d="M97 36C202 74 127 296 285 294S373 131 467 160" />
        </g>
        <g fill="#4cc7b2">
          <circle cx="65" cy="89" r="6" />
          <circle cx="421" cy="267" r="6" />
        </g>
        <g fill="#e5b565">
          <circle cx="131" cy="91" r="5" />
          <circle cx="443" cy="77" r="5" />
        </g>
        <g fill="#b394e9">
          <circle cx="105" cy="266" r="6" />
          <circle cx="425" cy="178" r="5" />
        </g>
        <rect
          x="160"
          y="77"
          width="224"
          height="266"
          rx="8"
          fill="#06101e"
          opacity=".35"
          transform="rotate(7 272 210)"
        />
        <g transform="rotate(-6 260 190)">
          <rect x="146" y="56" width="224" height="266" rx="8" fill="#e7eef7" />
          <path
            d="M146 64a8 8 0 0 1 8-8h208a8 8 0 0 1 8 8v39H146Z"
            fill="#2474c7"
          />
          <text x="168" y="86" fill="white" font-size="16">
            The record
          </text>
          <g stroke="#afbed0" stroke-width="2" fill="none">
            <rect x="168" y="126" width="17" height="17" rx="3" />
            <path d="M199 133h144M199 143h90M168 167h175M168 183h131" />
            <rect x="168" y="211" width="175" height="81" rx="3" />
          </g>
          <path
            d="m171 134 4 4 8-9"
            stroke="#2474c7"
            stroke-width="2"
            fill="none"
          />
          <path
            d="M169 267c38-4 64-53 96-30s49 24 77 5"
            stroke="#2474c7"
            stroke-width="2"
            fill="none"
          />
          <circle cx="263" cy="236" r="6" fill="#2474c7" />
        </g>
        <text x="18" y="57" fill="#c6d3e2" font-size="15">
          Context
        </text>
        <text x="401" y="326" fill="#c6d3e2" font-size="15">
          Conditions
        </text>
      </svg>
      <figcaption>A record has edges. The situation rarely does.</figcaption>
    </figure>
  );
}
