addresses = [ 'Montréal, 3415 Chemin de la Côte-des-Neiges', 'Montréal, 3655 Avenue du Musée', 'Montréal, 3475 Rue de la Montagne', 'Montréal, 3450 Rue Drummond' ]
sans_virgules = [address.replace(',', ' ') for address in addresses]
listes_de_mots = [sans_virgule.split() for sans_virgule in sans_virgules]
mots_en_commun = set(listes_de_mots[0])
for liste in listes_de_mots[1:]:
     mots_en_commun = mots_en_commun.intersection(set(liste))
for i, address in enumerate(addresses):
    for mot in list(mots_en_commun):
        addresses[i] = address.replace(mot, mot.upper())

print(addresses)
