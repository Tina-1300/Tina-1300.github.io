# ecrire un code qui permet de checker que le dossier contienne que une certene taille en MO
# et s'assurer de ne pas d'épassé cette taille pas dossier si ça dépasse on suprimme le fichier ajouter en dernier 
# et si l'utilisateur a payer un compte prenium bas on lui laisse quelques MO de plus
# et il gère les upload
import os

class BidulFile:

    def __init__(self):
        pass

    # Méthode qui permet de calculer la taille des dossier
    def get_total_size(self, directory):
        total_size = 0
        for dirpath, dirnames, filenames in os.walk(directory):
            for f in filenames:
                fp = os.path.join(dirpath, f)
                total_size += os.path.getsize(fp)
        return total_size

