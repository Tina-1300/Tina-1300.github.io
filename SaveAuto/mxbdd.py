import hashlib # pour géré les hash 
import sqlite3 # pour géré les base de donner


# Documentation :
# https://docs.python.org/3/library/sqlite3.html


class MXDBB:
    #Constructeur qui prend en paramètre le nom de la Base de donner 
    def __init__(self, NameBdd):
        self.NameBdd = NameBdd
        self.CreatDataBase()

    # Permet de cree la Base de donner si elle existe pas et de configurer ça table avec les champs pseudo et password
    def CreatDataBase(self):
        con = sqlite3.connect(self.NameBdd) # users.db
        cursor = con.cursor()
        # cree la table dans la bdd si elle éxiste pas
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pseudo TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
        ''')
        con.commit()
        con.close()

    # Permet de retourner le sha256 du mot de passe entre 
    def HashPassword_SHA256(self, password):
        return hashlib.sha256(password.encode()).hexdigest()


    # Permet de modifier son pseudo de compte
    def UpdatePasswordForUser(self, new_pseudo, ancien_pseudo): 
        con = sqlite3.connect(self.NameBdd)
        cursor = con.cursor()
        cursor.execute('UPDATE users SET pseudo = ? WHERE pseudo = ?', (new_pseudo, ancien_pseudo))
        result = cursor.fetchone()
        con.commit()
        con.close()

    # Permmet de modifier sont password de compte
    def UpdatePasswordForUser(self, pseudo, new_password):
        hashed_password = self.HashPassword_SHA256(new_password)  
        con = sqlite3.connect(self.NameBdd)
        cursor = con.cursor()
        cursor.execute('UPDATE users SET password = ? WHERE pseudo = ?', (hashed_password, pseudo,))
        result = cursor.fetchone()
        con.commit()
        con.close()


    #permet d'ajouter un utilisateur dans la BDD
    def AddUser(self, pseudo, password):
        if len(pseudo) > 15 or len(password) < 8:
            return -1
        else:
            hashed_password = self.HashPassword_SHA256(password)
            con = sqlite3.connect(self.NameBdd)
            cursor = con.cursor()
            try:
                cursor.execute('INSERT INTO users (pseudo, password) VALUES (?, ?)', (pseudo, hashed_password))
                con.commit()
            except sqlite3.IntegrityError:
                print("Le pseudo est déjà utilisé.")
            finally:
                con.close()

    # Permet de checker le mot de passe du user et le comparer au hash du mdp dans la bdd voir si ses le même si oui renvoi true sinon 
    # renvoie false 
    def CheckUserPassword(self, Users, password):
        hashed_password = self.HashPassword_SHA256(password)  
        con = sqlite3.connect(self.NameBdd)
        cursor = con.cursor()
        
        cursor.execute('SELECT password FROM users WHERE pseudo = ?', (Users,))
        result = cursor.fetchone()
        con.close()

        if result and result[0] == hashed_password:  
            return True
        return False
        

    # Permet de checker si l'utilisateur éxiste dans la bdd
    def CheckUser(self, Users):
        con = sqlite3.connect(self.NameBdd)
        cursor = con.cursor()
        cursor.execute('SELECT * FROM users WHERE pseudo = ?', (Users,))
        result = cursor.fetchone()
        con.close()
        return result is not None 

    # Faire une méthode pour suprimmer un user de la bdd 
    def DeletUserAccount(self, Users):
        con = sqlite3.connect(self.NameBdd)
        cursor = con.cursor()
        cursor.execute('DELETE FROM users WHERE pseudo = ?', (Users,))
        con.commit()
        con.close()
        

    def GetAllUsers(self):
        con = sqlite3.connect(self.NameBdd)
        cursor = con.cursor()
        cursor.execute("SELECT pseudo, id FROM users")
        users = cursor.fetchall()
        return [{'username': row[0], 'pseudo': row[0], 'id': row[1]} for row in users]

    def CheckUserID(self, user_id):
        con = sqlite3.connect(self.NameBdd)
        cursor = con.cursor()
        cursor.execute("SELECT * FROM users WHERE id=?", (user_id,))
        return cursor.fetchone() is not None
    
    def DeletUserAccountID(self, user_id):
        con = sqlite3.connect(self.NameBdd)
        cursor = con.cursor()
        query = "DELETE FROM users WHERE id = ?"
        cursor.execute(query, (user_id,))
        con.commit() 