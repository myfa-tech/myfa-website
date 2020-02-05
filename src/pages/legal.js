import React from 'react';

import SEO from '../components/seo';
import Layout from '../components/layout';
import { Container } from 'react-bootstrap';

const OrdersPage = () => (
  <Layout>
    <SEO title='Mentions légales' />

    <Container>
      <h1>Mentions Légales</h1>

      <p>Ce site est édité par la société <b>MYFA SAS</b>.</p>

      <p>Siège social : <b>MYFA SAS 102 rue de France 77300 FONTAINEBLEAU</b><br/>
      Capital social : <b>7 490 euros</b></p>

      <p>Responsable de l’édition :</p>
      <p>L&#39;édition du site <b>www.myfa.fr</b> est assurée par la <b>Société MYFA SAS au capital de 7 490
      euros, immatriculée au RCS de Melun sous le numéro 880958236</b> dont le siège social est
      situé au <b>102 rue de France, 77300 Fontainebleau.</b></p>

      <p>Responsable de l’hébergement :</p>
      <p>L&#39;hébergeur du site www.myfa.fr est la <b>Société Heroku, filiale de Salesforce, dont le siège
      social est situé au 50 Fremont St. Suite 300 San Francisco, CA 94105</b></p>

      <h2>Informatique et liberté</h2>

      <p>Aucune information personnelle n&#39;est collectée à votre insu. Les informations que vous nous
      communiquez <b>lors de la création de votre compte utilisateur ou de l’inscription à la
      newsletter par e-mail</b> sont uniquement destinées au traitement administratif et commercial
      de votre demande par la société <b>MYFA SAS</b>.</p>

      <p>Elles ne font l&#39;objet d&#39;aucune cession à des tiers. MYFA SAS traite les informations qui vous
      concernent avec la plus grande confidentialité.</p>

      <p>Conformément à la loi « Informatique et Libertés » n°78-17 du 6 janvier 1978, vous disposez
      d&#39;un droit d&#39;accès, de rectification et d&#39;opposition aux données personnelles vous concernant.</p>

      <p>Pour l&#39;exercer, il suffit de nous en faire la demande par écrit aux coordonnées suivantes : <a href="mailto:infos@myfa.fr">infos@myfa.fr</a></p>

      <h2>Droit d&#39;auteur / copyright</h2>

      <p>L&#39;ensemble du contenu du présent site Internet, y compris nom de domaine, marques, logo,
      texte… est la propriété de la société MYFA SAS, il est protégé par les lois en vigueur de la
      législation française sur la propriété intellectuelle.</p>

      <p>Aucun élément de ce site ne peut être copié, reproduit, détourné ou dénaturé, et ce, sur
      quelque support que ce soit, sans constituer un acte de contrefaçon au sens des articles L 335-
      2 et suivants du code de la propriété intellectuelle.</p>

      <h2>Accès au site</h2>

      <p>L&#39;utilisateur de ce site reconnaît disposer de la compétence et des moyens nécessaires pour
      accéder et utiliser ce site. MYFA SAS ne saurait être tenu responsable des éléments en dehors
      de son contrôle et des dommages qui pourraient éventuellement être subis par l&#39;environnement
      technique de l&#39;utilisateur et notamment, ses ordinateurs, logiciels, équipements réseaux et tout
      autre matériel utilisé pour accéder ou utiliser le service et/ou les informations.</p>

      <p>Il est rappelé que le fait d&#39;accéder ou de se maintenir frauduleusement dans un système
      informatique, d&#39;entraver ou de fausser le fonctionnement d&#39;un tel système, d&#39;introduire ou de
      modifier frauduleusement des données dans un système informatique constitue des délits
      passibles de sanctions pénales.</p>

      <h2>Limitation de responsabilité</h2>

      <p>MYFA SAS s&#39;attache à transmettre des informations régulièrement mises à jour, notamment
      sur les actualités ainsi que sur le contenu des articles. Toutefois des informations erronées ou
      des omissions peuvent être constatées, suite notamment à des erreurs de saisie ou de mise en
      page. Si vous en faisiez le constat nous vous invitons à nous le signaler pour que nous
      puissions procéder à leur rectification.</p>

      <p>Nous nous réservons par ailleurs le droit de modifier les informations ou les éventuelles offres
      commerciales fournies par le présent site, dans le cadre de nos opérations d&#39;actualisation et de
      mise à jour des données, et ce sans préavis.</p>

      <p>Les liens hypertextes mis en oeuvre au sein du présent site Internet, en direction d&#39;autres sites
      et/ou de pages personnelles et d&#39;une manière générale vers toutes ressources existantes sur
      Internet, ne sauraient engager la responsabilité de <b>MYFA SAS</b>.
      De même que la société <b>MYFA SAS</b> ne pourra en aucune façon être tenue pour responsable
      des sites ayant un lien hypertexte avec le présent site et décline toute responsabilité quant à
      leur contenu et à leur utilisation.</p>
    </Container>
  </Layout>
);

export default OrdersPage;
