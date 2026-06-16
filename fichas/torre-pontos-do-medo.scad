// ============================================
// Pontos do Medo — Torre de Cubos
// Diablo RPG | Paulo Souza
// ============================================
// Para cubinhos de 8mm (cristal acrílico roxo)
// Capacidade: 15 cubos (~120mm de coluna)
//
// Como usar:
//   - Coloque cubos pelo topo
//   - Para remover: empurre o cubo de baixo
//     pelo lado esquerdo — ele sai pela direita
//   - O peso da pilha mantém os outros no lugar
// ============================================

// --- Parâmetros ---
cube_size  = 8;    // lado do cubinho (mm)
tolerance  = 0.4;  // folga para impressão
wall       = 3;    // espessura da parede da coluna
base_w     = 46;   // largura da base
base_thick = 5;    // espessura da base
max_cubes  = 15;   // capacidade da torre
corner_r   = 4;    // raio dos cantos da base
window_pct = 0.5;  // largura da janela frontal (fração do canal)

// --- Calculados ---
ch    = cube_size + tolerance;
co    = ch + wall * 2;
col_h = cube_size * max_cubes;
win_w = ch * window_pct;

// Slot lateral: altura de 1 cubo + folga, largura total do canal
slot_h = cube_size + tolerance + 1;

// ============================================
// Base
// ============================================
module base() {
    hull()
        for (x = [-1, 1], y = [-1, 1])
            translate([x * (base_w/2 - corner_r), y * (base_w/2 - corner_r), 0])
                cylinder(r = corner_r, h = base_thick, $fn = 32);
}

// ============================================
// Coluna dispensadora
// ============================================
module column() {
    translate([0, 0, base_thick])
    difference() {
        // Corpo externo
        translate([-co/2, -co/2, 0])
            cube([co, co, col_h]);

        // Canal interno — cubos entram pelo topo
        translate([-ch/2, -ch/2, -1])
            cube([ch, ch, col_h + 2]);

        // Slot lateral esquerdo — dedo entra aqui para empurrar
        translate([-co/2 - 1, -ch/2, 0])
            cube([wall + 2, ch, slot_h]);

        // Slot lateral direito — cubo sai por aqui
        translate([co/2 - wall - 1, -ch/2, 0])
            cube([wall + 2, ch, slot_h]);

        // Janela frontal estreita — cubos visíveis mas não caem (janela < cubo)
        win_w = 5;  // menor que cube_size (8mm), cubos ficam retidos
        translate([-win_w/2, -co/2 - 1, -1])
            cube([win_w, wall + 2, col_h + 2]);
    }
}

// ============================================
// Empurrador de cubos
// Ponta: cabe no slot lateral (8.4 x 9.4mm)
// Cabo: largo para dedos grandes
// ============================================
module pusher() {
    ponta_w = ch - 0.6;   // largura da haste (cabe no slot)
    ponta_h = slot_h - 1; // altura da haste (cabe no slot)
    ponta_l = co * 2 + 20; // comprimento da haste (atravessa a torre com folga)
    cabo_w  = 30;          // comprimento da barra do T (pegador)
    cabo_h  = 14;         // altura da barra
    cabo_d  = 12;         // espessura da barra

    // Haste
    cube([ponta_l, ponta_w, ponta_h], center = true);

    // Barra do T — centrada na extremidade da haste
    translate([ponta_l/2 - cabo_d/2, 0, 0])
        cube([cabo_d, cabo_w, cabo_h], center = true);
}

// ============================================
// Montagem — torre + empurrador lado a lado
// ============================================
union() {
    base();
    column();
}

// Empurrador posicionado ao lado da torre para imprimir junto
translate([base_w + 15, 0, slot_h / 2])
    pusher();
