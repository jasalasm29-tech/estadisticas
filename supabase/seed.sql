-- Datos de ejemplo para la tabla `recommendations`.
-- Ejecutar tras 0001_init.sql para ver "Datos en vivo" en el dashboard.

insert into public.recommendations
  (match, type, recommendation, probability, odds, expected_value, risk, status, is_premium)
values
  ('Brasil vs Argentina', 'Combinada', 'Brasil gana + Over 2.5', 72, 3.2, 18.5, 'medium', 'won', false),
  ('Francia vs España', 'Doble Oportunidad', 'Francia gana o empate', 85, 1.45, 8.2, 'low', 'won', false),
  ('Alemania vs Holanda', 'Goles', 'Over 2.5', 68, 2.8, 15.3, 'medium', 'pending', false),
  ('Portugal vs Italia', 'Combinada', 'Portugal gana + ambos anotan', 55, 4.1, 21.8, 'high', 'pending', true),
  ('Uruguay vs Perú', 'Resultado', 'Uruguay gana', 78, 1.8, 10.2, 'low', 'lost', false),
  ('Inglaterra vs Bélgica', 'Goles', 'Ambos equipos anotan', 70, 1.95, 12.6, 'medium', 'pending', false);
