import time

ESTADOS = {
    "S0": "Via A Verde | Via B Vermelho | Pedestre Vermelho",
    "S1": "Via A Amarelo | Via B Vermelho | Pedestre Vermelho",
    "S2": "Via A Vermelho | Via B Verde | Pedestre Vermelho",
    "S3": "Via A Vermelho | Via B Amarelo | Pedestre Vermelho",
    "S4": "Via A Vermelho | Via B Vermelho | Pedestre Verde"
}

BINARIO = {
    "S0": "100001",
    "S1": "010001",
    "S2": "001100",
    "S3": "001010",
    "S4": "001001"
}

def decidir_estado(A, B, P, ultimo_estado="S2"):
    if P:
        return "S4"

    if A and not B:
        return "S0"

    if B and not A:
        return "S2"

    if A and B:
        if ultimo_estado == "S0":
            return "S2"
        return "S0"

    return "S0"

def mostrar_tabela_verdade():
    print("\nTABELA-VERDADE")
    print("A B P | Estado")
    print("----------------")

    for A in [0, 1]:
        for B in [0, 1]:
            for P in [0, 1]:
                estado = decidir_estado(A, B, P)
                print(f"{A} {B} {P} | {estado} - {ESTADOS[estado]}")

def simular():
    ultimo_estado = "S2"

    print("\n=== SIMULAÇÃO DO SEMÁFORO INTELIGENTE ===")

    A = int(input("Existe veículo na Via A? (1=sim / 0=não): "))
    B = int(input("Existe veículo na Via B? (1=sim / 0=não): "))
    P = int(input("Existe pedestre aguardando? (1=sim / 0=não): "))

    estado = decidir_estado(A, B, P, ultimo_estado)

    print("\nEstado escolhido:")
    print(estado, "-", ESTADOS[estado])
    print("Representação Binária:", BINARIO[estado])

    if estado == "S0":
        print("\nVia A liberada")
        time.sleep(1)
        print("Mudando para amarelo...")

    elif estado == "S2":
        print("\nVia B liberada")
        time.sleep(1)
        print("Mudando para amarelo...")

    elif estado == "S4":
        print("\nPedestres atravessando")
        time.sleep(1)

    print("\nFim da simulação.")

mostrar_tabela_verdade()
simular()
