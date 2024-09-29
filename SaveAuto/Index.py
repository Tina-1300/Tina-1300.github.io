from flask import Flask, session, redirect, url_for, request, flash, render_template, send_from_directory # pour géré le web
import hashlib # pour géré les hash 
from mxbdd import * # class pour géré les bdd 
import os
from BidulFile import * # cert a rien pour le momment
from werkzeug.utils import secure_filename
import shutil

# Documentation 
# https://flask.palletsprojects.com/en/3.0.x/
# https://docs.python.org/3/library/hashlib.html

# pour activer l'environement virtuell en installant des packet dans l'environnement 
# Scripts\activate

# mise a jour a faire 
# ajouter le payement pour pouvoir upload 100 MO de plus
# et faire en sort que les dossier utilisateur ou les user upload leur data  on puisse y stocket sur différent 
# disque dure 

# Checket les faill de sécurité avant la publication


# ajouter un profile (professeur, influenceur, paratgeur si l'un de c'est profiles et selectionner l'ors de l'upload on upload dans)
# Utilisateur/public/pseudo du compte et comme ça tous le monde peut voir, télécharger ce que l'utilisateur a poster mais il ne peuvent 
# par y suprimmer c'est que le compte qui la upload qui peut y suprimmer

app = Flask(__name__)
#cle pour les session, utilisateur a ne pas divulguer car on pourrais avoir des attaques 
app.secret_key = 'thdhyetdgersffertsvce32234#djsdfs.EERXZfsqdfsqsdffefaz2.'


@app.route('/welcome')
def welcome():
    return render_template('index.html')


@app.route('/')
def bienvenue():
    return redirect(url_for('welcome')) 

# permet de ce loger a son compte, pour ouvrire ça session acceder aux uploads que l'on a effectuer
@app.route('/loginProcess', methods=['POST'])
def loginProcess():
    mxdb = MXDBB("users.db")
    username = request.form['username']
    password = request.form['password']
    
    if mxdb.CheckUser(username):
        if mxdb.CheckUserPassword(username, password):
                session['username'] = username # creation de la session utilisateur l'orsque le pseudo et mdp et bien valider
                flash('Connexion réussie !', 'success')
                return redirect(url_for('dashboard')) 
        else:
            flash("Erreur lors de l'inscription de l'utilisateur mot de passe ou pseudo invalid.", 'danger')
            return redirect(url_for('login')) 
    else:
        return redirect(url_for('Register'))

# Permet de cree un compte si on a pas de compte sur le site 
@app.route('/RegisterProcess', methods=['POST'])
def RegisterProcess(): 
    mxdb = MXDBB("users.db")
    username = request.form['username']
    password = request.form['password']
    
    if mxdb.CheckUser(username):  
        flash("Erreur lors de la création du compte, le pseudo est peut-être déjà utiliser.", 'danger')
        return redirect(url_for('Register'))
    
    mxdb.AddUser(username, password)
    flash('Vous avez créé votre compte, bienvenue chez SaveAuto !', 'success')
    return redirect(url_for('login')) 



# ------------------------------------------------------------------------------


# permet de rediriger sur le panel admin si la session et bien administrateur
@app.route('/panel')
def panel():
    administrateur = ["Tina", "Admin"] # la liste d'admin
    
    if 'username' not in session:
        flash('Veuillez vous connecter pour accéder au panneau d\'administration.', 'danger')
        return redirect(url_for('login'))
    
    if session['username'] not in administrateur:
        flash('Vous n\'avez pas les droits d\'accès pour cette page.', 'danger')
        return redirect(url_for('dashboard'))

    mxdb = MXDBB("users.db")
    users = mxdb.GetAllUsers()
    
    for user in users:
        user_folder = os.path.join('Utilisateur', user['pseudo']) 
        if os.path.exists(user_folder):
            user['files'] = os.listdir(user_folder)
        else:
            user['files'] = []
    return render_template('admin_panel.html', users=users)

# permet aux admin de suprimmer un compte utilisateur ainsi que ses data qu'il a upload
@app.route('/delete_user/<user_id>', methods=['POST'])
def delete_user(user_id):
    if 'username' not in session or session['username'] not in ['Tina', 'Admin']:
        flash('Accès refusé', 'danger')
        return redirect(url_for('login'))

    mxdb = MXDBB("users.db")
    
    if mxdb.CheckUserID(user_id): 
        user_folder = os.path.join('Utilisateur', user_id) 
        if os.path.exists(user_folder):
            shutil.rmtree(user_folder) 
            flash(f'Les fichiers de l\'utilisateur {user_id} ont été supprimer.', 'success')
        else:
            flash(f'Le dossier de l\'utilisateur {user_id} n\'existe pas.', 'warning')
        
        mxdb.DeletUserAccountID(user_id)  
        flash(f"L'utilisateur {user_id} a été supprimer avec succès.", 'success')
    else:
        flash(f"L'utilisateur {user_id} n'existe pas.", 'danger')
    return redirect(url_for('panel'))

# permet aux administrateur de visionner ce que les session utilisateur et administrateur on upload
# et les utilisateur ne peuvent pas visionner les uploads des autres compte ces que les admin pour 
# permettre de banirre, ce qui upload des video (-18 ans, criminelle, ou autre contenu illicite...)
@app.route('/view/<pseudo>/<filename>', methods=['GET'])
def view_file_admin(pseudo, filename):
    if 'username' in session and session['username'] in ['Tina', 'Admin']:
        user_folder = os.path.join('Utilisateur', pseudo) 
        return send_from_directory(user_folder, filename)
    else:
        flash('Accès refusé', 'danger')
        return redirect(url_for('login'))
    
# permet aux administrateur de suprimmer un fichier upload pas un utilisateur
@app.route('/delete/<pseudo>/<filename>', methods=['POST'])
def delete_file_admin(pseudo, filename):
    if 'username' in session and session['username'] in ['Tina', 'Admin']:
        user_folder = os.path.join('Utilisateur', pseudo)
        file_path = os.path.join(user_folder, filename)
        
        if os.path.exists(file_path):
            os.remove(file_path)
            flash(f'Fichier {filename} supprimer avec succès.', 'success')
        else:
            flash(f'Le fichier {filename} n\'existe pas.', 'danger')
        
        return redirect(url_for('panel'))
    else:
        flash('Accès refusé', 'danger')
        return redirect(url_for('login'))


 
# ---------------------------------------------------------------------------------------


# route permettant de rediriger sur le dashboard de la session utilisateur si l'utilisateur et connecter 
@app.route('/dashboard')
def dashboard():
    if 'username' in session:
        user_folder = os.path.join('Utilisateur', session['username'])
        
        if not os.path.exists(user_folder):
            os.makedirs(user_folder)

        files = os.listdir(user_folder)
        
        return render_template('dashboard.html', username=session['username'], files=files)
    else:
        flash('Veuillez vous connecter pour accerder a vôtre session.', 'danger')
        return redirect(url_for('login'))
    

# permet a l'utilisateur de donload des fichiers qu'il a upload sur son compte 
@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    if 'username' in session:
        user_folder = os.path.join('Utilisateur', session['username'])
        return send_from_directory(user_folder, filename, as_attachment=True)
    else:
        flash('Veuillez vous connecter pour télécharger un fichier.', 'danger')
        return redirect(url_for('login'))
    

# suprimmer un fichier de la session qui demande une supression
@app.route('/delete/<filename>', methods=['POST'])
def delete_file(filename):
    if 'username' in session:
        user_folder = os.path.join('Utilisateur', session['username'])
        file_path = os.path.join(user_folder, filename)
        
        if os.path.exists(file_path):
            os.remove(file_path)
            flash(f'Fichier {filename} supprimer avec succès.', 'success')
        else:
            flash(f'Le fichier {filename} n\'existe pas.', 'danger')

        return redirect(url_for('dashboard'))
    else:
        flash('Veuillez vous connecter pour supprimer un fichier.', 'danger')
        return redirect(url_for('login'))


# permet de regarder un fichier upload pour l'utilisateur
@app.route('/view/<filename>', methods=['GET'])
def view_file(filename):
    if 'username' in session:
        user_folder = os.path.join('Utilisateur', session['username'])
        return send_from_directory(user_folder, filename)
    else:
        flash('Veuillez vous connecter pour visualiser un fichier.', 'danger')
        return redirect(url_for('login'))


# dexonnexion de la session utilisateur 
@app.route('/logout')
def logout():
    session.pop('username', None)  
    flash('Vous êtes déconnecter.', 'info')
    return redirect(url_for('welcome'))


@app.route('/Register')
def Register():
    return render_template('register.html')

@app.route('/login')
def login():
    return render_template('login.html')


# -------------------------------------------------------------------------------------

# faire le changement du mdp user dans la bdd
@app.route('/settings')
def settings():
    if 'username' not in session:
        flash('Veuillez vous connecter pour accéder à cette page.', 'danger')
        return redirect(url_for('login'))
    else:
        return render_template('Settings.html')
    


@app.route('/change_password', methods=['POST'])
def change_password():
    mxdb = MXDBB("users.db")
    username = request.form['pseudo']
    password_new = request.form['new_password']
    password = request.form['password']

    if mxdb.CheckUser(username):
        if mxdb.CheckUserPassword(username, password): 
                mxdb.UpdatePasswordForUser(username, password_new) # changer le mot de passe du compte utilisateur 
                session.pop('username', None) # deconnexion de la session utilisateur 
                flash('Le mot de passe a bien été modifier !', 'success')
                return redirect(url_for('login')) 
        else:
            flash("Erreur lors de l'inscription de l'utilisateur mot de passe ou pseudo invalid.", 'danger')
            return redirect(url_for('login')) 
    else:
        return redirect(url_for('Register'))



@app.route('/delete_account', methods=['POST'])
def delete_account():
    mxdb = MXDBB("users.db")
    username = request.form['username']
    password = request.form['delete_password']
    
    if mxdb.CheckUser(username):
        if mxdb.CheckUserPassword(username, password):
                    if 'username' in session:
                        user_folder = os.path.join('Utilisateur', session['username'])
                        shutil.rmtree(user_folder) # supression du dossier utilisateur qui contien tous les fichiers 
                        mxdb.DeletUserAccount(username)# suprimmer le compte utilisateur de la bdd
                        session.pop('username', None) # dexonnecter la session de l'utilisateur après la supression du compte de la bdd
                        flash('Supression du compte effectuer !', 'danger')
                        return redirect(url_for('login'))
        else:
            flash("Erreur lors de l'inscription de l'utilisateur mot de passe ou pseudo invalid.", 'danger')
            return redirect(url_for('login')) 
    else:
        return redirect(url_for('Register'))

# ----------------------------------------------------------------


# Partie upload
@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    bidul = BidulFile()
    if 'username' not in session:
        flash('Veuillez vous connecter pour accéder à cette page.', 'danger')
        return redirect(url_for('login'))

    user_folder = os.path.join('Utilisateur', session['username'])
    app.config['UPLOAD_FOLDER'] = user_folder
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'mp4', 'mp3', 'txt', 'pdf', 'docx', 'bmp', 'wav', 'pcapng', 'exe'}

    def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
    
    is_admin = session['username'] in ['Tina', 'Admin'] # vérification des admin
    
    if request.method == 'POST':
        total_size = bidul.get_total_size(user_folder)
        
        # les utilisateur peuvent upload 100 MO et les admin peuvent upload 500 MO
        size_limit = 500 * 1024 * 1024 if is_admin else 100 * 1024 * 1024
        
        if total_size >= size_limit:  
            flash(f'Vous avez atteint la limite de {size_limit / (1024 * 1024)} Mo. Veuillez supprimer des fichier avant d\'upload.', 'danger')
            return redirect(request.url)

        if 'file' not in request.files:
            flash('Aucun fichier sélectionner', 'danger')
            return redirect(request.url)

        file = request.files['file']

        if file.filename == '':
            flash('Aucun fichier sélectionner', 'danger')
            return redirect(request.url)

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            flash('Fichier uploader avec succès !', 'success')
            return redirect(url_for('dashboard'))

    return render_template('Upload.html')




app.run(host='192.168.1.188', port=8000, debug=True)

# commande pour run : python Index.py
